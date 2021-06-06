import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Provider,
    QueryList,
    ViewEncapsulation
} from '@angular/core';

import { FormField } from '../../form-field';
import { FormFieldGroup } from '../../form-field-group';
import { FormGroupContainer } from '../../form-group';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../constants';

const formFieldGroupProvider: Provider = {
    provide: FormFieldGroup,
    useExisting: forwardRef(() => FormFieldGroupComponent)
};

const formGroupChildProvider: Provider = {
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
export class FormFieldGroupComponent implements FormFieldGroup, OnInit, OnDestroy {
    /**
     * Group header title
     */
    @Input()
    label: string;

    /**
     * Form Group Container to bind the Form-Field-Group to.
     * This will override default value injected by constructor
     */
    @Input()
    formGroupContainer: FormGroupContainer;

    /**
     * Get form fields wrapped into form field group
     */
    @ContentChildren(FormField)
    fields: QueryList<FormField>;

    /** @hidden */
    constructor(@Optional() formGroupContainer: FormGroupContainer) {
        this.formGroupContainer = formGroupContainer;
    }

    /** @hidden */
    ngOnInit(): void {
        this._addToFormGroup();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._removeFromFormGroup();
    }

    /** @hidden */
    private _addToFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.addFormFieldGroup(this);
    }

    /** @hidden */
    private _removeFromFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.removeFormFieldGroup(this);
    }
}
