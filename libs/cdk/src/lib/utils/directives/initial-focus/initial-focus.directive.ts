import { AfterViewInit, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { TabbableElementService } from '../../services/tabbable-element.service';

@Directive({
    selector: '[fdInitialFocus], [fd-initial-focus]',
    providers: [TabbableElementService]
})
export class InitialFocusDirective implements AfterViewInit {
    /**
     * CSS selector of element that should be focused.
     */
    @Input('fd-initial-focus')
    focusableItem = '.fd-initial-focus-item';

    /**
     * Whether initial focus enabled for current element.
     */
    @Input()
    enabled = true;

    /**
     * Whether to focus last element in found array of elements.
     */
    @Input()
    focusLastElement = false;

    /** @hidden */
    constructor(
        private _elmRef: ElementRef<HTMLElement>,
        private _ngZone: NgZone,
        private readonly _tabbableService: TabbableElementService
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._executeOnStable(() => this._focus());
    }

    /**
     * @hidden
     * Executes a function when the zone is stable.
     */
    private _executeOnStable(fn: () => any): void {
        if (this._ngZone.isStable) {
            fn();
        } else {
            this._ngZone.onStable.pipe(take(1)).subscribe(fn);
        }
    }

    /**
     * @hidden
     * Searches for appropriate focusable element
     */
    private _getFocusableElement(): HTMLElement | null {
        if (!this.focusableItem) {
            return this._tabbableService.getTabbableElement(this._elmRef.nativeElement, this.focusLastElement);
        }

        const autoFocusableItems = this._elmRef.nativeElement.querySelectorAll(
            this.focusableItem
        ) as NodeListOf<HTMLElement>;

        if (autoFocusableItems.length > 0) {
            return !this.focusLastElement ? autoFocusableItems[0] : autoFocusableItems[autoFocusableItems.length - 1];
        }

        // If no elements found, fallback to first tabbable element.
        return this._tabbableService.getTabbableElement(this._elmRef.nativeElement, this.focusLastElement);
    }

    /** @hidden */
    private _focus(): void {
        if (!this.enabled) {
            return;
        }
        this._getFocusableElement()?.focus();
    }
}
