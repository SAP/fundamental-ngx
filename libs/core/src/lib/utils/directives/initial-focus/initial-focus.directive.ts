import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { InteractivityChecker } from '@angular/cdk/a11y';

@Directive({
    selector: '[fdInitialFocus], [fd-initial-focus]'
})
export class InitialFocusDirective implements AfterViewInit {
    /** Whether initial focus functionality should be enabled */
    @Input()
    enabled = true;

    constructor(private _elementRef: ElementRef, private _interactivityChecker: InteractivityChecker) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.enabled) {
            setTimeout(() => this._focusFirstTabbableElement());
        }
    }

    private _focusFirstTabbableElement(): void {
        const firstTabbableElement = this._getFirstTabbableElement(this._elementRef.nativeElement);
        if (firstTabbableElement && typeof firstTabbableElement.focus === 'function') {
            firstTabbableElement.focus();
        }
    }

    /** @hidden */
    private _getFirstTabbableElement(root: HTMLElement): HTMLElement | null {
        if (this._interactivityChecker.isFocusable(root) && this._interactivityChecker.isTabbable(root)) {
            return root;
        }

        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        const children = root.children || root.childNodes;

        for (let i = 0; i < children.length; i++) {
            const tabbableChild =
                children[i].nodeType === document.ELEMENT_NODE
                    ? this._getFirstTabbableElement(children[i] as HTMLElement)
                    : null;

            if (tabbableChild) {
                return tabbableChild;
            }
        }

        return null;
    }
}
