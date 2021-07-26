import { ChangeDetectorRef, Host, Input, Directive, Optional, Self, SkipSelf, NgZone, OnDestroy } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';

import { InlineLayout, RESPONSIVE_BREAKPOINTS } from './../form/form-options';
import { isFunction, isJsObject, isString } from '../../utils/lang';
import { FormFieldControl } from './form-control';
import { FormField } from './form-field';
import { isSelectItem } from '../../domain/data-model';
import { SelectItem } from '../../domain/data-model';
import { BaseInput } from './base.input';

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
export abstract class CollectionBaseInput extends BaseInput implements OnDestroy {
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

    protected _inlineCurrentValue = new BehaviorSubject<boolean>(false);

    /** @hidden */
    protected _isInlineCurrent: boolean;

    /** @hidden */
    private _xlIsInline: boolean;

    /** @hidden */
    private _lgIsInline: boolean;

    /** @hidden */
    private _mdIsInline: boolean;

    /** @hidden */
    private _sIsInline: boolean;

    /** @hidden */
    private _isInLineLayoutEnabled = true;

    /** @hidden */
    private _resizeObservable$: Observable<Event>;

    /** @hidden */
    private _resizeSubscription$: Subscription;

    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        private _ngZone?: NgZone
    ) {
        super(cd, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._resizeSubscription$?.unsubscribe();
        super.ngOnDestroy();
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

    /** set values of inline for each screen layout */
    protected _setFieldLayout(inlineLayout: InlineLayout): void {
        try {
            this._sIsInline = !!inlineLayout['S'];
            this._mdIsInline = !!inlineLayout['M'];
            this._lgIsInline = !!inlineLayout['L'];
            this._xlIsInline = !!inlineLayout['XL'];
            this._updateLayout();
        } catch (error) {
            this._isInLineLayoutEnabled = false;
        }

        if (this._isInLineLayoutEnabled) {
            this._resizeObservable$ = fromEvent(window, 'resize');
            // Unsubscribe previous subcription
            this._resizeSubscription$?.unsubscribe();

            this._ngZone.runOutsideAngular(() => {
                this._resizeSubscription$ = this._resizeObservable$
                    ?.pipe(debounceTime(50))
                    .subscribe(() => this._updateLayout());
            });
        }
    }

    /** @hidden */
    private _updateLayout(): void {
        const width = window.innerWidth;

        // check if value has changed, then only assign new value.
        if (width > 0 && width < RESPONSIVE_BREAKPOINTS['S'] && this._isInlineCurrent !== this._sIsInline) {
            this._isInlineCurrent = this._sIsInline;
            this._inlineCurrentValue.next(this._isInlineCurrent);
        } else if (
            width >= RESPONSIVE_BREAKPOINTS['S'] &&
            width < RESPONSIVE_BREAKPOINTS['M'] &&
            this._isInlineCurrent !== this._mdIsInline
        ) {
            this._isInlineCurrent = this._mdIsInline;
            this._inlineCurrentValue.next(this._isInlineCurrent);
        } else if (
            width >= RESPONSIVE_BREAKPOINTS['M'] &&
            width < RESPONSIVE_BREAKPOINTS['L'] &&
            this._isInlineCurrent !== this._lgIsInline
        ) {
            this._isInlineCurrent = this._lgIsInline;
            this._inlineCurrentValue.next(this._isInlineCurrent);
        } else if (width >= RESPONSIVE_BREAKPOINTS['L'] && this._isInlineCurrent !== this._xlIsInline) {
            this._isInlineCurrent = this._xlIsInline;
            this._inlineCurrentValue.next(this._isInlineCurrent);
        }
    }
}
