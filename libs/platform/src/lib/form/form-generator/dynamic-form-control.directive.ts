import { Directive, Inject, Injector, Input, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';
import { PreparedDynamicFormFieldItem } from './interfaces/dynamic-form-item';
import { BaseDynamicFormGeneratorControl } from './base-dynamic-form-generator-control';
import { FormGeneratorService } from './form-generator.service';
import {
    CONTENT_DENSITY_DIRECTIVE,
    ContentDensityGlobalKeyword,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { Observable, of } from 'rxjs';

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
    @Input() formItem: PreparedDynamicFormFieldItem;

    /**
     * @description Represents form control name.
     */
    @Input() name: string;

    /**
     * @description Reference to the @see FormGroup class.
     */
    @Input() form: FormGroup;

    /** Form group name path */
    @Input() formGroupNamePath: string;

    /**
     * @description Reference to the @see FormFieldComponent
     */
    @Input() formField: FormField;

    /**
     * Control field instance.
     */
    formFieldControl: FormFieldControl;

    /** @hidden */
    constructor(
        private readonly _formGeneratorService: FormGeneratorService,
        private readonly _vcRef: ViewContainerRef,
        private readonly _injector: Injector,
        @Optional() @Inject(CONTENT_DENSITY_DIRECTIVE) private contentDensityDirective: Observable<ContentDensityMode>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        const foundComponent = this._formGeneratorService.getComponentDefinitionByType(this.formItem.type);

        if (!foundComponent) {
            return;
        }

        this._vcRef.clear();

        const componentRef = this._vcRef.createComponent<BaseDynamicFormGeneratorControl>(foundComponent.component, {
            injector: Injector.create({
                providers: [
                    {
                        provide: CONTENT_DENSITY_DIRECTIVE,
                        useFactory: () => {
                            if (this.formItem?.guiOptions?.contentDensity) {
                                return of(this.formItem.guiOptions.contentDensity);
                            }
                            if (this.contentDensityDirective) {
                                return this.contentDensityDirective;
                            }
                            return of(ContentDensityGlobalKeyword);
                        }
                    }
                ],
                parent: this._injector
            })
        });

        componentRef.instance.formItem = this.formItem;
        componentRef.instance.name = this.name;
        componentRef.instance.form = this.form;
        componentRef.instance.formField = this.formField;
        componentRef.instance.formGroupName = this.formGroupNamePath;

        this.formFieldControl = componentRef.instance as unknown as FormFieldControl;
    }
}
