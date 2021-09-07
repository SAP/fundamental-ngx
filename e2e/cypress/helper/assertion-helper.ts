import { checkAttributeByName, checkCSSPropertyByName } from '../cypress-methods/cypress';

export function checkRTLOrientation(element: string, index?: number): void {
    checkAttributeByName(element, 'dir', 'rtl', index);
    checkCSSPropertyByName(element, 'direction', 'rtl', index);
}

export function checkLTROrientation(element: string, index?: number): void {
    checkAttributeByName(element, 'dir', 'ltr', index);
    checkCSSPropertyByName(element, 'direction', 'ltr', index);
}

