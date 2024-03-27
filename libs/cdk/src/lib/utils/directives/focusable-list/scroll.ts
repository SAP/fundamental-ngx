import { Nullable } from '../../models/nullable';

export type ScrollPosition = 'top' | 'bottom' | undefined;

/** Helper function to scroll to focusable list or its item relatively to the container. */
export function scrollIntoView(element: Nullable<HTMLElement>, position: Nullable<ScrollPosition>): void {
    if (!element) {
        return;
    }

    const scrollableParent = getScrollParent(element);

    if (scrollableParent) {
        const itemOffsetTop = element.offsetTop - scrollableParent.offsetTop;
        if (!position) {
            /**
             * check if top of focused element is fully visible, and if not, adjust scroll.
             * this is triggered when a sticky table header overlaps the focused cell.
             */
            const elRect = element.getBoundingClientRect();
            const topEl = document.elementFromPoint(elRect.left, elRect.top) as HTMLElement;
            if (
                !element.isSameNode(topEl) &&
                topEl &&
                element.getBoundingClientRect().top !== topEl.getBoundingClientRect().top
            ) {
                scrollableParent.scrollBy({ top: elRect.top - topEl.getBoundingClientRect().bottom });
            }
        }
        switch (position) {
            case 'top':
                scrollableParent.scrollTop = itemOffsetTop;
                break;
            case 'bottom':
                scrollableParent.scrollTop = itemOffsetTop - (scrollableParent.offsetHeight - element.offsetHeight);
                break;
        }
    }
}

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
    if (node == null) {
        return null;
    }

    if (node.scrollHeight > node.clientHeight && ['auto', 'scroll'].includes(getComputedStyle(node).overflowY)) {
        return node;
    } else {
        return getScrollParent(node.parentNode as HTMLElement);
    }
}
