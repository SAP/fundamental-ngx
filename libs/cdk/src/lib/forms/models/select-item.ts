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

export interface OptionItem<T = any> {
    /** Item text */
    label: string;

    /**
     * References to the object instance
     */
    value: T;
    id?: string;
    isGroup?: boolean;
    secondaryText?: string;
    children?: OptionItem[];
}

export interface SelectableOptionItem<T = any> extends OptionItem<T> {
    selected?: boolean;
    children?: SelectableOptionItem[];
}

/** @hidden */
export function isSelectableItem(item: SelectItem): item is SelectItem {
    return (
        item &&
        item.label !== undefined &&
        item.value !== undefined &&
        Object.prototype.hasOwnProperty.call(item, 'selected')
    );
}

/** @hidden */
export function isSelectItem(item: SelectItem): item is SelectItem {
    return item && item.label !== undefined && item.value !== undefined;
}

export const isOptionItem = isSelectItem;
export const isSelectableOptionItem = isSelectableItem;
