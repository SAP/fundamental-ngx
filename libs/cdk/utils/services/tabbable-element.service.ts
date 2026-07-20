import { InteractivityChecker } from '@angular/cdk/a11y';

import { DOCUMENT, Inject, Injectable, Optional } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TabbableElementService {
    /** @hidden */
    constructor(
        private readonly _checker: InteractivityChecker,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null
    ) {}

    /** Get the first tabbable element from a DOM subtree (inclusive). */
    getTabbableElement(root: HTMLElement, focusLastElement = false, skipSelf = false): HTMLElement | null {
        if (!skipSelf && this._isTabbableElement(root)) {
            return root;
        }

        const elementNodeType = this._document?.ELEMENT_NODE ?? 1;

        // Iterate in DOM order. Note that IE doesn't have `children` for SVG, so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        const rootChildren = root.children || root.childNodes;

        const children = focusLastElement ? Array.from(rootChildren).reverse() : rootChildren;

        for (let i = 0; i < children.length; i++) {
            const tabbableChild =
                children[i].nodeType === elementNodeType
                    ? this.getTabbableElement(children[i] as HTMLElement, focusLastElement)
                    : null;

            if (tabbableChild) {
                return tabbableChild;
            }
        }

        return null;
    }

    private _isTabbableElement(element: HTMLElement): boolean {
        return (
            this._checker.isTabbable(element) &&
            !this._isElementDisabled(element) &&
            this._checker.isFocusable(element, { ignoreVisibility: true })
        );
    }

    private _isElementDisabled(element: HTMLElement): boolean {
        return (
            element.hasAttribute('disabled') ||
            element.getAttribute('aria-disabled') === 'true' ||
            element.classList.contains('is-disabled')
        );
    }
}
