import { TemplateRef } from '@angular/core';

import { FormField } from '@fundamental-ngx/platform/shared';
import { FormFieldComponent } from './form-group/form-field/form-field.component';
import { FormFieldGroupComponent } from './form-group/form-field-group/form-field-group.component';
import { FormGeneratorFieldComponent } from './form-generator/form-generator-field/form-generator-field.component';

export interface FieldColumn {
    [key: number]: Array<Field>;
}

export function isFieldChild(child: unknown): child is FormFieldComponent {
    return child instanceof FormFieldComponent;
}

export function isFieldGroupWrapperChild(child: unknown): child is FormGeneratorFieldComponent {
    return child instanceof FormGeneratorFieldComponent;
}

export function isFieldGroupChild(child: unknown): child is FormFieldGroupComponent {
    return child instanceof FormFieldGroupComponent;
}

export function getFormField(field: FormField | FormGeneratorFieldComponent): FormField {
    return isFieldGroupWrapperChild(field) ? field.fieldRenderer : field;
}

export function getField(field: FormField): Field {
    field = isFieldGroupWrapperChild(field) ? field.fieldRenderer : field;

    return new Field(field.id, field.rank, field.renderer, field.column);
}

export class Field {
    constructor(
        public name?: string,
        public rank?: number,
        public renderer?: TemplateRef<any>,
        public column?: number
    ) {}
}

export class FieldGroup {
    constructor(public label: string, public fields: FieldColumn) {}
}
