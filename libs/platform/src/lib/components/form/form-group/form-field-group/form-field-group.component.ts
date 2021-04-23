import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    Provider,
    QueryList,
    ViewEncapsulation
} from '@angular/core';

import { FormField } from '../../form-field';
import { FormFieldGroup } from '../../form-field-group';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../constants';

export const formFieldGroupProvider: Provider = {
    provide: FormFieldGroup,
    useExisting: forwardRef(() => FormFieldGroupComponent)
};

export const formGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldGroupComponent)
};

@Component({
    selector: 'fdp-form-field-group',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-field-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [formFieldGroupProvider, formGroupChildProvider]
})
export class FormFieldGroupComponent implements FormFieldGroup {
    /** Group header title*/
    @Input()
    label: string;

    /** Get form fields wrapped into form field group */
    @ContentChildren(FormField)
    fields: QueryList<FormField>;
}
