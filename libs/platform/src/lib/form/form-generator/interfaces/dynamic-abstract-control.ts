import { AbstractControlOptions } from '@angular/forms';

import { DynamicFormFieldItem } from './dynamic-form-item';

export interface DynamicAbstractControlOptions extends AbstractControlOptions {
    dynamicFormItem: DynamicFormFieldItem;
}
