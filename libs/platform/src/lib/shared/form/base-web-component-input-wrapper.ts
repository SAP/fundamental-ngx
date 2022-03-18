import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Host,
    HostListener,
    OnDestroy,
    Optional,
    Self,
    SkipSelf
} from '@angular/core';
import { BaseInput } from './base.input';
import { FormField } from './form-field';
import { FormFieldControl } from './form-control';
import { NgControl, NgForm } from '@angular/forms';

/**
 * Abstract class used by classes which will wrap web components and act as inputs.
 */
@Directive()
export abstract class BaseWebComponentInputWrapper extends BaseInput implements AfterViewInit, OnDestroy {
    /** @hidden */
    _value: string;

    /** @hidden */
    @HostListener('click')
    onClick(): void {
        this.onTouched();
    }

    get value(): string {
        return this._value;
    }
    set value(colorValue: string) {
        this._value = colorValue;
        this.onChange(colorValue);
        this.onTouched();
    }

    /** @hidden */
    onFocus(): void {
        this.onTouched();
    }

    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        private _wcElRef: ElementRef
    ) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (this._contentDensityService) {
            this._contentDensityService.handleWebComponentContentDensity(
                this._wcElRef.nativeElement.classList,
                this._subscriptions
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._subscriptions.unsubscribe();
    }
}
