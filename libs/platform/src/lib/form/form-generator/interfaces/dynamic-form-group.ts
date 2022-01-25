import { FormGroup } from '@angular/forms';

import { DynamicFormGroupControl } from '../dynamic-form-control';

export interface DynamicFormGroup extends FormGroup {
    controls: {
        [key: string]: DynamicFormGroupControl;
    };
}
