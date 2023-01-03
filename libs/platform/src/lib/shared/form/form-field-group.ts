import { QueryList } from '@angular/core';
import { PlatformFormField } from './form-field';

import { ColumnLayout } from './form-options';

/**
 * FormFieldGroup base class
 *
 * This class is used to create form field group components.
 */
export abstract class FormFieldGroup {
    /** Group header*/
    label: string;

    /** Group's form name */
    formName: string;

    /** Group fields */
    fields: QueryList<PlatformFormField>;

    /**
     * Defines label's column layout.
     */
    labelColumnLayout: ColumnLayout;

    /**
     * Defines field's column layout.
     */
    fieldColumnLayout: ColumnLayout;

    /**
     * Defines gap column layout.
     */
    gapColumnLayout: ColumnLayout;
}
