import { TemplateRef } from '@angular/core';

import { FormField } from './form-field/form-field';
import { LabelLayout, HintPlacement } from './form-options';

export abstract class FormGroupContainer {
    i18Strings: TemplateRef<any>;
    editable: boolean;
    noLabelLayout: boolean;
    labelLayout: LabelLayout;
    hintPlacement: HintPlacement;
    addFormField: (formField: FormField) => void;
    removeFormField: (formField: FormField) => void;
}
