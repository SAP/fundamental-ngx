import { Injectable } from '@angular/core';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { DialogWizardGeneratorComponent } from './components/dialog-wizard-generator/dialog-wizard-generator.component';
import { WizardDialogData } from './interfaces/wizard-dialog-data.interface';
import { WizardGeneratorFormsValue } from './interfaces/wizard-generator-forms.interface';

/**
 * @description Helper service to launch Wizard in dialog with minimal user input.
 */
@Injectable()
export class WizardDialogGeneratorService {
    /** @hidden */
    constructor(private _dialogService: DialogService) {}

    /**
     * @description Opens dialog with wizard component inside.
     * @param config Dialog options with wizard config.
     * @returns DialogRef instance.
     */
    open(config: DialogConfig<WizardDialogData>): DialogRef<WizardDialogData, WizardGeneratorFormsValue> {
        const dialogRef = this._dialogService.open(DialogWizardGeneratorComponent, config);

        return dialogRef;
    }
}
