import { Input } from '@angular/core';
import { BaseInput } from './base.input';
import { isSelectItem } from '../../domain/data-model';
import { isFunction, isJsObject } from '../../utils/lang';


/**
 * Defines specific behavior for Input controls which deals with list of values including:
 *  - Select
 *  - RadioGroup
 *  - CheckboxGroup
 *  - ComboBox
 *  ...
 *
 */
export abstract class CollectionBaseInput extends BaseInput {
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
            return (this.lookupKey && item) ? item.value[this.lookupKey] : item.value;
        } else {
            return (this.lookupKey && item) ? item[this.lookupKey] : item;
        }
    }

    protected displayValue(item: any): string {
        if (isSelectItem(item)) {
            return item.label;
        } else if (isJsObject(item) && this.displayKey) {
            return isFunction(item[this.displayKey]) ? item[this.displayKey]() : item[this.displayKey];
        } else {
            return item;
        }
    }
}

