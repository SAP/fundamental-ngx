import { Input, Directive, OnInit } from '@angular/core';
import { BaseInput } from './base.input';
import { isSelectItem } from '../../domain/data-model';
import { isFunction, isJsObject, isString } from '../../utils/lang';
import { SelectItem } from '../../domain/data-model';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { InlineLayout } from './../form/form-options';


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
export abstract class CollectionBaseInput extends BaseInput implements OnInit {
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

    /** To display all the fields of collection in a line */
    @Input()
    set isInline(inline: boolean) {
        this._isInline = inline;
        this._cd.markForCheck();
    }
    get isInline(): boolean {
        return this._isInline;
    }

    /** object to change isInline property based on screen size */
    @Input()
    get inlineLayout(): InlineLayout {
        return this._inlineLayout;
    }

    set inlineLayout(layout: InlineLayout) {
        this._inlineLayout = layout;
    }

    private _inlineLayout: InlineLayout;
    private _isInline: boolean;
    private _xlIsInline: boolean;
    private _lgIsInline: boolean;
    private _mdIsInline: boolean;
    private _sIsInline: boolean;
    private _isInLineLayoutEnabled = true;

    ngOnInit(): void {
        this._setFieldLayout();
    }

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

    protected _setFieldLayout(): void {
        try {
            this._xlIsInline = this.inlineLayout['XL'];
            this._lgIsInline = this.inlineLayout['L'];
            this._mdIsInline = this.inlineLayout['M'];
            this._sIsInline = this.inlineLayout['S'];
            this._updateLayout();
        } catch (error) {
            this._isInLineLayoutEnabled = false;
        }

        if (this._isInLineLayoutEnabled) {
            fromEvent(window, 'resize')
                .pipe(debounceTime(50), takeUntil(this._destroyed))
                .subscribe(() => this._updateLayout());
        }
    }

    /** @hidden */
    private _updateLayout(): void {
        const width = window.innerWidth;

        // check if value has changed, then only assign new value.
        if (width > 0 && width < 600 && this.isInline !== this._sIsInline) {
            this.isInline = this._sIsInline;
        } else if (width >= 600 && width < 1024 && this.isInline !== this._mdIsInline) {
            this.isInline = this._mdIsInline;
        } else if (width >= 1024 && width < 1440 && this.isInline !== this._lgIsInline) {
            this.isInline = this._lgIsInline;
        } else if (width >= 1440 && this.isInline !== this._xlIsInline) {
            this.isInline = this._xlIsInline;
        }
    }
}
