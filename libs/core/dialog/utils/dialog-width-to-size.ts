/** @ignore Describes available dialog padding sizes */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

/** @ignore Returns dialog size based on width
 * @param width - dialog window width
 **/
export function dialogWidthToSize(width: number): DialogSize {
    if (width < 599) {
        return 'sm';
    } else if (width < 1023) {
        return 'md';
    } else if (width < 1439) {
        return 'lg';
    }
    return 'xl';
}
