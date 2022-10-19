import { InteractivityChecker } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class TabbableElementService {
    /** @hidden */
    constructor(
        private readonly _checker: InteractivityChecker,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null
    ) {}

    /** Get the first tabbable element from a DOM subtree (inclusive). */
    getTabbableElement(root: HTMLElement, focusLastElement = false, skipSelf = false): HTMLElement | null {
        if (!skipSelf && this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }

        // Iterate in DOM order. Note that IE doesn't have `children` for SVG, so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        const rootChildren = root.children || root.childNodes;

        const children = focusLastElement ? Array.from(rootChildren).reverse() : rootChildren;

        for (let i = 0; i < children.length; i++) {
            const tabbableChild =
                children[i].nodeType === this._document?.ELEMENT_NODE
                    ? this.getTabbableElement(children[i] as HTMLElement, focusLastElement)
                    : null;

            if (tabbableChild) {
                return tabbableChild;
            }
        }

        return null;
    }
}
