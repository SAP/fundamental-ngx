import { AfterViewInit, DestroyRef, Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';
import { TabbableElementService } from '../../services/tabbable-element.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdInitialFocus], [fd-initial-focus]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkInitialFocus]', '[fdInitialFocus], [fd-initial-focus]')
        }
    ]
})
export class DeprecatedInitialFocusDirective extends DeprecatedSelector {
    /** @hidden */
    private _initialFocusDirective = inject(InitialFocusDirective, { host: true });

    /**
     * CSS selector of an element that should be focused.
     */
    @Input('fd-initial-focus')
    set initialFocusTarget(value: string) {
        this._initialFocusDirective.fdkInitialFocus = value;
    }
}

@Directive({
    selector: '[fdkInitialFocus], [fdInitialFocus], [fd-initial-focus]',
    standalone: true,
    providers: [
        TabbableElementService,
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkInitialFocus]', '[fdInitialFocus], [fd-initial-focus]')
        }
    ]
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
