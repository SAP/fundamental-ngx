import { ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { HasElementRef } from '../../interfaces';
import { getNativeElement } from '../../helpers/get-native-element';

const focusableTagnamesByDefault = new Set(['select', 'textarea', 'input', 'button', 'audio', 'video']);

const focusableTagOptions = [
    {
        tag: 'div',
        attributes: [
            {
                name: 'contenteditable',
                valueMatcher: (value: string) => coerceBooleanProperty(value)
            }
        ]
    }
];

/** @hidden */
export function isElementFocusableByDefault(el: HasElementRef<Element> | Element | ElementRef<Element>): boolean {
    const element = getNativeElement(el);
    const tagName = element.tagName.toLowerCase();
    if (focusableTagnamesByDefault.has(tagName)) {
        return true;
    }

    return focusableTagOptions.some((tagOptions) => {
        if (tagOptions.tag === tagName) {
            return tagOptions.attributes.some((attribute) => {
                const attrVal = element.getAttribute(attribute.name);
                return attrVal && attribute.valueMatcher(attrVal);
            });
        }
        return false;
    });
}
