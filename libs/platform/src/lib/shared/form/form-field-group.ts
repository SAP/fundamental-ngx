import { QueryList } from '@angular/core';

import { FormField } from './form-field';

/**
 * FormFieldGroup base class
 *
 * This class is used to create form field group components.
 */
export abstract class FormFieldGroup {
    /** Group header*/
    label: string;

    /** Group fields */
    fields: QueryList<FormField>;
}
