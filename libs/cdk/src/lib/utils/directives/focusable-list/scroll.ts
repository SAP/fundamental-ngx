export type ScrollPosition = 'top' | 'bottom' | undefined;

/** Helper function to scroll to focusable list or its item relatively to the container. */
export function scrollIntoView(element: HTMLElement, position: ScrollPosition): void {
    if (!position) {
        return;
    }

    const scrollableParent = getScrollParent(element);

    if (scrollableParent) {
        const itemOffsetTop = element.offsetTop - scrollableParent.offsetTop;
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

    if (node.scrollHeight > node.clientHeight) {
        return node;
    } else {
        return getScrollParent(node.parentNode as HTMLElement);
    }
}
