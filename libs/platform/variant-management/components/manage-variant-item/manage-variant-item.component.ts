import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import {
    CheckboxComponent,
    FormFieldComponent,
    FormFieldErrorDirective,
    FormGroupComponent,
    InputComponent
} from '@fundamental-ngx/platform/form';
import { SaveDialogContext } from '../../models/save-dialog.model';

@Component({
    selector: 'fdp-manage-variant-item',
    templateUrl: './manage-variant-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        FormGroupComponent,
        FormsModule,
        ReactiveFormsModule,
        FormFieldComponent,
        InputComponent,
        CheckboxComponent,
        FormFieldErrorDirective,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
    ]
})
export class ManageVariantItemComponent {
    /** @hidden */
    @ViewChild('formContainer', { read: FormGroupDirective })
    private readonly _formContainer: FormGroupDirective;

    /** @Hidden */
    _form: FormGroup;
    /** @hidden */
    _nameValidator: ValidatorFn[];

    /** @hidden */
    private readonly _dialogConfig: SaveDialogContext;

    /** @hidden */
    constructor(
        public dialog: DialogRef<SaveDialogContext>,
        private readonly _formBuilder: FormBuilder
    ) {
        this._dialogConfig = this.dialog.data;
        this._nameValidator = [this._variantNameValidator(this._dialogConfig)];
        this._form = this._formBuilder.group({
            name: [
                this._dialogConfig.currentVariantName,
                [Validators.required, this._variantNameValidator(this._dialogConfig)]
            ],
            isDefault: false,
            access: 'private',
            applyAutomatically: false,
            readonly: false,
            favourite: false
        });
    }
    /** @Hidden */
    _submitForm(): void {
        this._formContainer.onSubmit(new Event('submit'));

        if (!this._form.valid) {
            return;
        }

        this.dialog.close(this._form.value);
    }

    /** @hidden */
    private _variantNameValidator(data: SaveDialogContext): ValidatorFn {
        return (control): ValidationErrors | null =>
            data.existingVariantNames.includes(control.value) ? { nameTaken: true } : null;
    }
}
