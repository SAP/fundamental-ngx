import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { SaveDialogContext } from '../../models/save-dialog.model';

@Component({
    selector: 'fdp-manage-variant-item',
    templateUrl: './manage-variant-item.component.html',
    styleUrls: ['./manage-variant-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageVariantItemComponent {
    /** @Hidden */
    _form: FormGroup;

    /** @hidden */
    @ViewChild('formContainer', { read: FormGroupDirective })
    private readonly _formContainer: FormGroupDirective;
    /** @hidden */
    _nameValidator: ValidatorFn[];

    /** @hidden */
    private readonly _dialogConfig: SaveDialogContext;

    /** @hidden */
    constructor(public dialog: DialogRef<SaveDialogContext>, private readonly _formBuilder: FormBuilder) {
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
