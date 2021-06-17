import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { DynamicFormControl } from './dynamic-form-control';

/**
 * @description
 * Structural directive, which hides current form item and toggles validation rules for it.
 */
@Directive({
    selector: '[fdpDynamicFormControlField]'
})
export class DynamicFormControlFieldDirective implements OnInit {

    /**
     * @hidden
     */
    private _control: DynamicFormControl;

    /**
     * @hidden
     */
    private _originalValidators: ValidatorFn | ValidatorFn[];

    /**
     * @hidden
     */
    private _originalAsyncValidators: AsyncValidatorFn | AsyncValidatorFn[];

    /**
     * @hidden
     */
    private _componentRemoved = true;

    constructor(
        private readonly _templateRef: TemplateRef<any>,
        private readonly _viewContainer: ViewContainerRef
    ) {
    }

    /**
     * @description boolean flag representing if current item should be shown
     */
    @Input()
    set fdpDynamicFormControlFieldShow(value: boolean) {
        this.shouldShowFormItem = value;
        this._updateView();
    }

    @Input()
    set fdpDynamicFormControlField(value: AbstractControl) {
        this._control = value as DynamicFormControl;

        this._originalValidators = this._control.formItem.validators;
        this._originalAsyncValidators = this._control.formItem.asyncValidators;

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
            this._control.setValidators(this._originalValidators);
            this._control.setAsyncValidators(this._originalAsyncValidators);
        }

        this._control.updateValueAndValidity({ emitEvent: false });
    }

    /**
     * @hidden
     */
    private _shouldShowFormItem = false;

    ngOnInit(): void {
        this._updateView();
    }

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
