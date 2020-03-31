/** Function used for finding the closest HTML Element matching provided selector
 *  closestElement method traverses parents (heading toward the document root) of the element until it finds a node
 *  that matches the provided selector.
 * */
export function closestElement(selector, element): Element | null {

    const matches = document.querySelectorAll(selector);
    let matched: boolean;

    do {
        matched = false;

        for (let i = matches.item.length; i >= 0; i--) {
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
