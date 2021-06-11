import { Type } from '@angular/core';
import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';

export interface FormComponentDefinition {
    types?: string[];
    component: Type<BaseDynamicFormGeneratorControl>;
}
