import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { DynamicFormControl } from './dynamic-form-control';

/**
 * @description
 * Structural directive, which hides current form item and toggles validation rules for it.
 */
@Directive({
    selector: '[fdpDynamicFormControlField]',
    standalone: true
})
export class DynamicFormControlFieldDirective implements OnInit {
    /**
     * @description Form control instance.
     */
    @Input()
    set fdpDynamicFormControlField(value: DynamicFormControl) {
        this._control = value;

        this._originalValidators = this._control.formItem.validators;
        this._originalAsyncValidators = this._control.formItem.asyncValidators;

        this._updateView();
    }

    /**
     * @description boolean flag representing if current item should be shown.
     */
    @Input()
    set fdpDynamicFormControlFieldShow(value: boolean) {
        this.shouldShowFormItem = value;
        this._updateView();
    }

    /**
     * @hidden
     */
    private _control: DynamicFormControl;

    /**
     * @hidden
     */
    private _originalValidators?: Nullable<ValidatorFn | ValidatorFn[]>;

    /**
     * @hidden
     */
    private _originalAsyncValidators: Nullable<AsyncValidatorFn | AsyncValidatorFn[]>;

    /**
     * @hidden
     */
    private _componentRemoved = true;

    /**
     * @hidden
     */
    private _shouldShowFormItem: boolean;

    /** @hidden */
    constructor(private readonly _templateRef: TemplateRef<any>, private readonly _viewContainer: ViewContainerRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._updateView();
    }

    /**
     * @description If false, validation will be skipped from the form item control
     */
    set shouldShowFormItem(value: boolean) {
        if (value === this._shouldShowFormItem) {
            return;
        }

        this._shouldShowFormItem = value;

        if (!value) {
            this._control.clearValidators();
            this._control.clearAsyncValidators();
        } else {
            this._control.setValidators(this._originalValidators ?? []);
            this._control.setAsyncValidators(this._originalAsyncValidators ?? []);
        }

        this._control.updateValueAndValidity({ emitEvent: false });
    }

    /** @hidden */
    private _updateView(): void {
        if (this._shouldShowFormItem && this._componentRemoved) {
            this._viewContainer.createEmbeddedView(this._templateRef);
            this._componentRemoved = false;
        } else if (!this._shouldShowFormItem) {
            this._viewContainer.clear();
            this._componentRemoved = true;
        }
    }
}
