import { AbstractControlOptions } from '@angular/forms';

import { PreparedDynamicFormFieldItem } from './dynamic-form-item';

export interface DynamicAbstractControlOptions extends AbstractControlOptions {
    dynamicFormItem: PreparedDynamicFormFieldItem;
}
