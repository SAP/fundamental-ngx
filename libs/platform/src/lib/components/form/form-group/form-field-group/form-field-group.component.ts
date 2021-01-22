import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    OnInit,
    Provider,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { FormField } from '../../form-field';
import { FormGroupContainer} from '../../form-group';
import { FormFieldGroup } from '../../form-field-group';

export const formFieldGroupProvider: Provider = {
    provide: FormFieldGroup,
    useExisting: forwardRef(() => FormFieldGroupComponent)
};

@Component({
    selector: 'fdp-form-field-group',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-field-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [formFieldGroupProvider]
})
export class FormFieldGroupComponent implements FormFieldGroup, OnInit {
    /** Group header title*/
    @Input()
    label: string;

    /** Get form fields wrapped into form field group */
    @ContentChildren(FormField) fields: QueryList<FormField>;

    constructor(
        private readonly formGroupContainer: FormGroupContainer
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._addFormFieldGroup();
    }

    /** @hidden */
    private _addFormFieldGroup(): void {
        this.formGroupContainer.addFormFieldGroup(this);
    }
 }
