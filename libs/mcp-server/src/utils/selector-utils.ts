/**
 * Selector analysis utilities for Angular component/directive metadata.
 */

/**
 * Derive `selectorType` and `templateUsage` from a raw CSS selector string.
 *
 * Examples:
 *   "fd-card"                      -> element,   "<fd-card>...</fd-card>"
 *   "button[fd-button], a[fd-button]" -> both,  "<button fd-button>...</button>"
 *   "[fd-title]"                   -> attribute, "<element fd-title>...</element>"
 *   "[fdOverflowLayout]"           -> attribute, "<element fdOverflowLayout>...</element>"
 *   "ui5-button"                   -> element,   "<ui5-button>...</ui5-button>"
 */
export function deriveSelectorInfo(selector: string): {
    selectorType: 'element' | 'attribute' | 'both';
    templateUsage: string;
} {
    const first = (selector || '').split(',')[0].trim();

    if (!first) {
        return {
            selectorType: 'element',
            templateUsage: '<unknown>...</unknown>'
        };
    }

    // Pattern: element[attr] -- e.g. "button[fd-button]"
    const bothMatch = first.match(/^(\w[\w-]*)\[([^\]]+)\]$/);
    if (bothMatch) {
        const [, element, attr] = bothMatch;
        return {
            selectorType: 'both',
            templateUsage: `<${element} ${attr}>...</${element}>`
        };
    }

    // Pattern: [attr] -- e.g. "[fd-title]" or "[fdOverflowLayout]"
    const attrMatch = first.match(/^\[([^\]]+)\]$/);
    if (attrMatch) {
        const attr = attrMatch[1];
        return {
            selectorType: 'attribute',
            templateUsage: `<element ${attr}>...</element>`
        };
    }

    // Otherwise: plain element selector -- e.g. "fd-card", "ui5-button"
    return {
        selectorType: 'element',
        templateUsage: `<${first}>...</${first}>`
    };
}
