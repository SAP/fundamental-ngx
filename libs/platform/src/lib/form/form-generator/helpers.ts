import { HintOptions } from '@fundamental-ngx/platform/shared';
import {
    DynamicFormFieldGroup,
    DynamicFormFieldGroupMap,
    DynamicFormFieldItem,
    DynamicFormItem,
    DynamicFormItemMap
} from './interfaces/dynamic-form-item';

/** @hidden */
export function isHintOptions(opts: string | HintOptions): opts is HintOptions {
    return !!opts && typeof opts !== 'string';
}

/** @hidden */
export function mapFormItems(formItems?: DynamicFormItem[]): Map<string, DynamicFormItemMap> {
    const mappedItems: Map<string, DynamicFormItemMap> = new Map();

    if (!formItems) {
        return mappedItems;
    }

    formItems.forEach((item, index) => {
        const mappedItem = transformFormItem(item, index);

        mappedItems.set(mappedItem.name, mappedItem);
    });

    return mappedItems;
}

/** @hidden */
export function transformFormItem(
    item: DynamicFormItem,
    index: number
): DynamicFormFieldGroupMap | DynamicFormFieldItem {
    if (isFormGroupItem(item)) {
        const mappedItem = Object.assign({}, item, { items: mapFormItems(item.items) });
        mappedItem.rank = mappedItem.rank || index;
        return mappedItem;
    } else {
        item.rank = item.rank || index;
    }
    return item;
}

/**
 * Is current form item is a field item.
 * @param item form item.
 * @returns is current form item is a field.
 */
export function isFormFieldItem(item: any): item is DynamicFormFieldItem {
    return !!(item as DynamicFormFieldItem).type;
}

/**
 * Is current form item is a group item.
 * @param item form item.
 * @returns is current form item is a group.
 */
/** @hidden */
export function isFormGroupItem(item: any): item is DynamicFormFieldGroup {
    return !!(item as DynamicFormFieldGroup).items;
}

/** @hidden */
export function getParentItem(path: string[], rootItems: Map<string, DynamicFormItemMap>): DynamicFormItemMap | null {
    return path.reduce((acc: DynamicFormItemMap | null, chunk) => {
        const parent = acc === null ? rootItems : acc.items;
        return parent.get(chunk) || null;
    }, null);
}
