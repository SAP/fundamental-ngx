import { TemplateRef } from '@angular/core';

import { FormFieldControl } from '../../form-control';
import { LabelLayout, Column, FormZone, HintPlacement } from '../form-options';

export abstract class FormField {
    id: string;
    rank: number;
    renderer: TemplateRef<any>;
    columns: Column;
    fluid: boolean;
    zone: FormZone;
    i18Strings: TemplateRef<any>;
    editable: boolean;
    noLabelLayout: boolean;
    labelLayout: LabelLayout;
    hintPlacement: HintPlacement;
    control: FormFieldControl<any>;
    registerFormFieldControl: (control: FormFieldControl<any>) => void;
    unregisterFormFieldControl: (control: FormFieldControl<any>) => void;
}
