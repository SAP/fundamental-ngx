import { isSelectItem, SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { isFunction, isJsObject, isString } from '@fundamental-ngx/cdk/utils';
import equal from 'fast-deep-equal';

/** @hidden */
export function lookupValue(item: any, lookupKey: string): string {
    if (isSelectItem(item)) {
        return lookupKey && item ? item.value[lookupKey] : item.value;
    } else {
        return lookupKey && item ? item[lookupKey] : item;
    }
}

/** @hidden */
export function displayValue(item: any, displayKey: string): string {
    if (isSelectItem(item)) {
        return item.label;
    } else if (isJsObject(item) && displayKey) {
        const currentItem = objectGet(item, displayKey);

        return isFunction(currentItem) ? currentItem() : currentItem;
    } else {
        return item;
    }
}

/** @hidden */
export function objectGet(obj: any, is: string | string[] | undefined): any {
    if (!isJsObject(obj)) {
        return obj;
    } else if (isString(is)) {
        return objectGet(obj, is.split('.'));
    } else if (!is?.length) {
        return obj;
    } else {
        return objectGet(obj[is[0]], is.slice(1));
    }
}

/** @hidden */
export function getSelectItemByInputValue<T>(
    suggestions: SelectableOptionItem<T>[],
    needleValue: string
): SelectableOptionItem<T> | undefined {
    return suggestions.find((value) => value.label === needleValue);
}

/** @hidden
 *  Map grouped values to array. */
export function flattenGroups(items: SelectableOptionItem[]): SelectableOptionItem[] {
    return items.reduce((result, item) => result.concat(item.children ?? []), <SelectableOptionItem[]>[]);
}

/** @hidden */
export function getTokenIndexByIdlOrValue(item: SelectableOptionItem, suggestions: SelectableOptionItem[]): number {
    return suggestions.findIndex((token) => token.id === item.id || equal(token.value, item.value));
}
