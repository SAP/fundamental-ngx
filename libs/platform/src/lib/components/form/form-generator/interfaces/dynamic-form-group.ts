import { FormGroup } from '@angular/forms';
import { DynamicFormControl } from '../dynamic-form-control';

export interface DynamicFormGroup extends FormGroup {
    controls: {
        [key: string]: DynamicFormControl;
    };
}
