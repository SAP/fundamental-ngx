/**
 * Function used to scroll specified element by some distance
 *
 * @param containerElement     - Container element scrolled
 * @param distanceToScroll     - Distance of scroll in px
 * */
export function scrollTop(containerElement: Element, distanceToScroll: number): void {
    // Check if scrollTo method is supported by current browser
    if (containerElement.scrollTo && containerElement.scrollTo instanceof Function) {
        containerElement.scrollTo({
            top: distanceToScroll,
            behavior: 'smooth'
        });
    } else {
        containerElement.scrollTop = distanceToScroll;
    }
}
