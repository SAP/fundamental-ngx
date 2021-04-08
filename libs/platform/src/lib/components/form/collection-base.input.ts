import { Input, Directive } from '@angular/core';
import { BaseInput } from './base.input';
import { isSelectItem } from '../../domain/data-model';
import { isFunction, isJsObject, isString } from '../../utils/lang';
import { SelectItem } from '../../domain/data-model';

/**
 * Defines specific behavior for Input controls which deals with list of values including:
 *  - Select
 *  - RadioGroup
 *  - CheckboxGroup
 *  - ComboBox
 *  ...
 *
 */
@Directive()
export abstract class CollectionBaseInput extends BaseInput {
    /**
     * list of values, it can be of type SelectItem or String.
     */
    @Input()
    get list(): Array<SelectItem | string> {
        return this._list;
    }

    set list(value: Array<SelectItem | string>) {
        this._list = value;
    }
    private _list: Array<SelectItem | string>;

    /**
     * Used in filters and any kind of comparators when we work with objects and this identify
     * unique field name based on which we are going to do the job
     */
    @Input()
    lookupKey: string;

    /**
     * When we deal with unknown object we can use `displayKey` to retrieve value from specific
     * property of the object to act as display value.
     *
     * @See ComboBox, Select, RadioGroup, CheckBox Group
     */
    @Input()
    displayKey: string;

    protected lookupValue(item: any): string {
        if (isSelectItem(item)) {
            return this.lookupKey && item ? item.value[this.lookupKey] : item.value;
        } else {
            return this.lookupKey && item ? item[this.lookupKey] : item;
        }
    }

    protected displayValue(item: any): string {
        if (isSelectItem(item)) {
            return item.label;
        } else if (isJsObject(item) && this.displayKey) {
            const currentItem = this.objectGet(item, this.displayKey);

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return item;
        }
    }

    protected objectGet(obj: any, is: string | string[]): any {
        if (!isJsObject(obj)) {
            return obj;
        } else if (isString(is)) {
            return this.objectGet(obj, is.split('.'));
        } else if (is.length === 0) {
            return obj;
        } else {
            return this.objectGet(obj[is[0]], is.slice(1));
        }
    }
}
