import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input, NgZone, Optional } from '@angular/core';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { take } from 'rxjs/operators';

@Directive({
    selector: '[fdInitialFocus], [fd-initial-focus]'
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
        private _checker: InteractivityChecker,
        private _ngZone: NgZone,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null
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
            return this._getTabbableElement(this._elmRef.nativeElement);
        }

        const autoFocusableItems = this._elmRef.nativeElement.querySelectorAll(
            this.focusableItem
        ) as NodeListOf<HTMLElement>;

        if (autoFocusableItems.length > 0) {
            return !this.focusLastElement ? autoFocusableItems[0] : autoFocusableItems[autoFocusableItems.length - 1];
        }

        // If no elements found, fallback to first tabbable element.
        return this._getTabbableElement(this._elmRef.nativeElement);
    }

    /** @hidden
     * Get the first tabbable element from a DOM subtree (inclusive).
     */
    private _getTabbableElement(root: HTMLElement): HTMLElement | null {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }

        // Iterate in DOM order. Note that IE doesn't have `children` for SVG, so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        const rootChildren = root.children || root.childNodes;

        const children = this.focusLastElement ? Array.from(rootChildren).reverse() : rootChildren;

        for (let i = 0; i < children.length; i++) {
            const tabbableChild =
                children[i].nodeType === this._document?.ELEMENT_NODE
                    ? this._getTabbableElement(children[i] as HTMLElement)
                    : null;

            if (tabbableChild) {
                return tabbableChild;
            }
        }

        return null;
    }

    /** @hidden */
    private _focus(): void {
        if (!this.enabled) {
            return;
        }
        this._getFocusableElement()?.focus();
    }
}
