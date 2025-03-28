import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PlatformFormField, SelectItem } from '@fundamental-ngx/platform/shared';
import { BaseDynamicFormFieldItem, PreparedDynamicFormFieldItem } from './interfaces/dynamic-form-item';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from './providers/providers';

export interface BaseDynamicFormGeneratorControlInterface {
    formItem: PreparedDynamicFormFieldItem;
    name: string;
    id: string;
    form: FormGroup;
    formField: PlatformFormField;
}

/**
 * Abstract class that used as a base for the Dynamic Form Generator components.
 */
@Directive({
    providers: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export abstract class BaseDynamicFormGeneratorControl<T extends BaseDynamicFormFieldItem = BaseDynamicFormFieldItem>
    implements BaseDynamicFormGeneratorControlInterface
{
    /**
     * @description @see DynamicFormItem.
     */
    @Input() formItem: PreparedDynamicFormFieldItem<T>;

    /**
     * @description Id of the control.
     */
    @Input() id: string;

    /**
     * @description Represents form control name.
     */
    @Input() name: string;

    /**
     * @description Reference to the @see FormGroup class.
     */
    @Input() form: FormGroup;

    /**
     * @description Reference to the @see FormFieldComponent.
     */
    @Input() formField: PlatformFormField;

    /** @description Inner form group name */
    @Input() formGroupName: string;

    /** @description Returns form item choices. */
    get choices(): SelectItem[] {
        return this.formItem.choices ?? [];
    }

    /** @description Returns form item placeholder. */
    get placeholder(): string {
        if (!this.formItem) {
            return '';
        }
        if (this.formItem?.placeholder) {
            return this.formItem?.placeholder;
        }
        return (this.formItem?.useMessageAsPlaceholder && this.formItem?.message) || '';
    }

    /** @hidden */
    get readonly(): boolean {
        return this.formItem?.readonly ?? false;
    }
}
