/** Function used for finding the closest HTML Element matching provided selector
 *  closestElement method traverses parents (heading toward the document root) of the element until it finds a node
 *  that matches the provided selector.
 * */
export function closestElement(selector, element): Element | null {
    const matches = document.querySelectorAll(selector);
    let matched: boolean;

    do {
        matched = false;

        for (let i = matches.length; i >= 0; i--) {
            if (matches.item(i) === element) {
                matched = true;
                break;
            }
        }

        if (!matched) {
            element = element.parentElement;
        }
    } while (!matched && element);

    return element;
}

/** Alternative way to get closes element. */
export function getClosest(selector, elem): Element | null {
    // .matches polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    // get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) {
            return elem;
        }
    }
    return null;
}
