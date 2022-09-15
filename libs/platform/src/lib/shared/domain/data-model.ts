import { coerceArray } from '@angular/cdk/coercion';
import { isBlank } from './../utils/lang';

/**
 * Interface SelectItem is used to deal with complex object in order to be able to format
 * custom label that is shown in the options.
 *
 * Used in various controls: Select, RadioGroup, CheckboxGroup, Combobox
 */
export interface SelectItem<T = any> {
    /**
     * Item text shown in the popup
     */
    label: string;

    /**
     * References to the object instance
     */
    value: T;
    disabled?: boolean;

    icon?: string;
    /**
     * Trigger values is a text for selected item
     */
    triggerValue?: string;

    isGroup?: boolean;
    secondaryText?: string;
    children?: SelectItem[];
}

export interface OptionItem {
    /** Item text */
    label: string;

    /**
     * References to the object instance
     */
    value: any;
    id?: string;
    isGroup?: boolean;
    secondaryText?: string;
    children?: OptionItem[];
}

export interface SelectableOptionItem extends OptionItem {
    selected?: boolean;
    children?: SelectableOptionItem[];
}

export function isSelectableItem(item: SelectItem): item is SelectItem {
    return (
        item &&
        item.label !== undefined &&
        item.value !== undefined &&
        Object.prototype.hasOwnProperty.call(item, 'selected')
    );
}

export function isSelectItem(item: SelectItem): item is SelectItem {
    return item && item.label !== undefined && item.value !== undefined;
}

export interface MultiInputOption {
    /** Item text */
    label: string;

    /**
     * References to the object instance
     */
    value: any;

    /**
     * Item Avatar
     */
    avatarSrc?: string;

    isGroup?: boolean;
    description?: string;
    children?: MultiInputOption[];
}

export const isOptionItem = isSelectItem;
export const isSelectableOptionItem = isSelectableItem;

/**
 * Wraps the provided value in an array, unless it is an array already.
 * If `null` or `undefined` is received, will return an empty array.
 */
export function coerceArraySafe<T>(value: T | T[]): T[] {
    return isBlank(value) ? [] : coerceArray(value);
}
