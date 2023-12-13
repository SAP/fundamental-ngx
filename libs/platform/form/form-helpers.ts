import { PlatformFormField } from '@fundamental-ngx/platform/shared';
import { FormGeneratorFieldComponent } from './form-generator/form-generator-field/form-generator-field.component';
import { FormFieldGroupComponent } from './form-group/form-field-group/form-field-group.component';
import { FormFieldComponent } from './form-group/form-field/form-field.component';
import { Field } from './models/field.model';

/** @ignore */
export function isFieldChild(child: unknown): child is PlatformFormField {
    return child instanceof FormFieldComponent;
}

/** @ignore */
export function isFieldGroupWrapperChild(child: unknown): child is FormGeneratorFieldComponent {
    return child instanceof FormGeneratorFieldComponent;
}

/** @ignore */
export function isFieldGroupChild(child: unknown): child is FormFieldGroupComponent {
    return child instanceof FormFieldGroupComponent;
}

/** @ignore */
export function getFormField(field: PlatformFormField | FormGeneratorFieldComponent): PlatformFormField {
    return isFieldGroupWrapperChild(field) ? field.fieldRenderer : field;
}

/** @ignore */
export function getField(field: PlatformFormField): Field {
    field = isFieldGroupWrapperChild(field) ? field.fieldRenderer : field;

    return new Field(field.id, field.rank, field.renderer, field.column);
}
