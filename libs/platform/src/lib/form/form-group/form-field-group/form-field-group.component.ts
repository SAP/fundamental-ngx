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
import { FD_FORM_FIELD } from '@fundamental-ngx/cdk/forms';

import {
    ColumnLayout,
    FormFieldGroup,
    FormGroupContainer,
    HintOptions,
    PlatformFormField
} from '@fundamental-ngx/platform/shared';
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
    template: ` <ng-content></ng-content>`,
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

    /** Group's form name */
    @Input()
    formName: string;

    /**
     * Form Group Container to bind the Form-Field-Group to.
     * This will override default value injected by constructor
     */
    @Input()
    formGroupContainer: FormGroupContainer;

    /**
     * Defines label's column layout.
     */
    @Input()
    set labelColumnLayout(value: ColumnLayout | undefined) {
        if (value) {
            this._labelColumnLayout = value;
        }
    }
    get labelColumnLayout(): ColumnLayout {
        return this._labelColumnLayout;
    }
    /** @hidden */
    private _labelColumnLayout: ColumnLayout;

    /**
     * Defines field's column layout.
     */
    @Input()
    set fieldColumnLayout(value: ColumnLayout | undefined) {
        if (value) {
            this._fieldColumnLayout = value;
        }
    }
    get fieldColumnLayout(): ColumnLayout {
        return this._fieldColumnLayout;
    }
    /** @hidden */
    private _fieldColumnLayout: ColumnLayout;

    /**
     * Defines gap column layout.
     */
    @Input()
    set gapColumnLayout(value: ColumnLayout | undefined) {
        if (value) {
            this._gapColumnLayout = value;
        }
    }
    get gapColumnLayout(): ColumnLayout {
        return this._gapColumnLayout;
    }
    /** @hidden */
    private _gapColumnLayout: ColumnLayout;

    /**
     * Describes hint options for group header
     */
    @Input()
    hintOptions?: HintOptions;

    /**
     * Get form fields wrapped into form field group
     */
    @ContentChildren(FD_FORM_FIELD, { descendants: true })
    fields: QueryList<PlatformFormField>;

    /** @hidden */
    constructor(@Optional() formGroupContainer: FormGroupContainer) {
        this.formGroupContainer = formGroupContainer;
    }

    /** @hidden */
    ngOnInit(): void {
        this._addToFormGroup();
        this._setDefaultLayout();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._removeFromFormGroup();
    }

    /** @hidden */
    private _setDefaultLayout(): void {
        // If layout already defined, no need to set default one.
        if (this.labelColumnLayout) {
            return;
        }

        this.labelColumnLayout = this.formGroupContainer?.labelColumnLayout;
        this.fieldColumnLayout = this.formGroupContainer?.fieldColumnLayout;
        this.gapColumnLayout = this.formGroupContainer?.gapColumnLayout;
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
