import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { TabbableElementService } from '../../services/tabbable-element.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[fdkInitialFocus]',
    standalone: true,
    providers: [TabbableElementService]
})
export class InitialFocusDirective implements AfterViewInit {
    /**
     * CSS selector of an element that should be focused.
     */
    @Input()
    fdkInitialFocus = '.fd-initial-focus-item';

    /**
     * Whether initial focus enabled for a current element.
     */
    @Input()
    set enabled(value: boolean) {
        if (value === this.enabled) {
            return;
        }
        this._enabled$.next(value);
    }

    get enabled(): boolean {
        return this._enabled$.getValue();
    }

    /**
     * Whether to focus last element in a found array of elements.
     */
    @Input()
    focusLastElement = false;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _enabled$ = new BehaviorSubject<boolean>(true);

    /** @hidden */
    constructor(
        private _elmRef: ElementRef<HTMLElement>,
        private _ngZone: NgZone,
        private readonly _tabbableService: TabbableElementService
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._enabled$
            .pipe(
                distinctUntilChanged(),
                filter((enabled) => enabled),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._executeOnEmpty(() => this._focus());
            });
    }

    /**
     * @hidden
     * Executes a function when the zone is stable.
     */
    private _executeOnEmpty(fn: () => any): void {
        if (!this._ngZone.hasPendingMicrotasks) {
            fn();
        } else {
            this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(fn);
        }
    }

    /**
     * @hidden
     * Searches for an appropriate focusable element
     */
    private _getFocusableElement(): HTMLElement | null {
        if (!this.fdkInitialFocus) {
            return this._tabbableService.getTabbableElement(this._elmRef.nativeElement, this.focusLastElement);
        }

        const autoFocusableItems = this._elmRef.nativeElement.querySelectorAll(
            this.fdkInitialFocus
        ) as NodeListOf<HTMLElement>;

        if (autoFocusableItems.length > 0) {
            return !this.focusLastElement ? autoFocusableItems[0] : autoFocusableItems[autoFocusableItems.length - 1];
        }

        // If no elements found, fallback to a first tabbable element.
        return this._tabbableService.getTabbableElement(this._elmRef.nativeElement, this.focusLastElement);
    }

    /** @hidden */
    private _focus(): void {
        if (!this.enabled) {
            return;
        }
        const elm = this._getFocusableElement();
        elm?.focus();
    }
}
