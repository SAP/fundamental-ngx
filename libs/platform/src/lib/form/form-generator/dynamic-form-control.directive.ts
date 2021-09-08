import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from '@fundamental-ngx/platform/shared';
import { DynamicFormItem } from './interfaces/dynamic-form-item';
import { BaseDynamicFormGeneratorControl } from './base-dynamic-form-generator-control';
import { FormGeneratorService } from './form-generator.service';

/**
 * Dynamic form control directive represents a renderer of the dynamic components
 * based on the information provided in `formItem` input
 */
@Directive({
    selector: '[fdpDynamicFormControl]'
})
export class DynamicFormControlDirective implements OnInit {

    /**
     * @description @see DynamicFormItem
     */
    @Input() formItem: DynamicFormItem;

    /**
     * @description Represents form control name.
     */
    @Input() name: string;

    /**
     * @description Reference to the @see FormGroup class.
     */
    @Input() form: FormGroup;

    /**
     * @description Reference to the @see FormFieldComponent
     */
    @Input() formField: FormField;

    constructor(
        private readonly _formGeneratorService: FormGeneratorService,
        private readonly _vcRef: ViewContainerRef,
        private readonly _cfRes: ComponentFactoryResolver
    ) {
    }

    ngOnInit(): void {

        const foundComponent = this._formGeneratorService.getComponentDefinitionByType(this.formItem.type);

        if (!foundComponent) {
            return;
        }

        const componentFactory = this._cfRes.resolveComponentFactory<BaseDynamicFormGeneratorControl>(foundComponent.component);

        this._vcRef.clear();

        const componentRef = this._vcRef.createComponent<BaseDynamicFormGeneratorControl>(componentFactory);

        componentRef.instance.formItem = this.formItem;
        componentRef.instance.name = this.name;
        componentRef.instance.form = this.form;
        componentRef.instance.formField = this.formField;
    }
}
