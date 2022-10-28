import { ChangeDetectorRef, Directive, Host, Input, Optional, Self, SkipSelf } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { BaseInput } from './base.input';
import { FormField } from './form-field';
import { FormFieldControl } from './form-control';
import { isFunction, isJsObject, isString } from '../utils/lang';
import { isSelectItem, SelectItem } from '../domain/data-model';

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
     * List of values, it can be of type SelectItem, string or any object.
     * Generic object type is among the list of types,
     * because we allow to get labels and values using `displayKey` and `lookupKey` inputs accordingly.
     */
    @Input()
    set list(value: Array<SelectItem | string | object>) {
        this._list = value;
    }
    get list(): Array<SelectItem | string | object> {
        return this._list;
    }

    /** @hidden */
    private _list: Array<SelectItem | string | object>;

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

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    public lookupValue(item: any): string {
        if (isSelectItem(item)) {
            return this.lookupKey && item ? item.value[this.lookupKey] : item.value;
        } else {
            return this.lookupKey && item ? item[this.lookupKey] : item;
        }
    }

    /** @hidden */
    public displayValue(item: any): string {
        if (isSelectItem(item)) {
            return item.label;
        } else if (isJsObject(item) && this.displayKey) {
            const currentItem = this.objectGet(item, this.displayKey);

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return item;
        }
    }

    /** @hidden */
    public objectGet(obj: any, is: string | string[] | undefined): any {
        if (!isJsObject(obj)) {
            return obj;
        } else if (isString(is)) {
            return this.objectGet(obj, is.split('.'));
        } else if (!is?.length) {
            return obj;
        } else {
            return this.objectGet(obj[is[0]], is.slice(1));
        }
    }
}
