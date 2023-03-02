import { AfterViewInit, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';
import { TabbableElementService } from '../../services/tabbable-element.service';

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
export class DeprecatedInitialFocusDirective extends DeprecatedSelector {}

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
        this._executeOnEmpty(() => this._focus());
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
