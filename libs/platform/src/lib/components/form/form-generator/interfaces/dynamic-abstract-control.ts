import { AbstractControlOptions } from '@angular/forms';
import { DynamicFormItem } from './dynamic-form-item';

export interface DynamicAbstractControlOptions extends AbstractControlOptions {
    dynamicFormitem: DynamicFormItem;
  }
