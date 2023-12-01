import { QueryList } from '@angular/core';
import { FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { Subject } from 'rxjs';
import { WizardStepForms, WizardStepSubmittedForms } from './wizard-generator-forms.interface';

export interface WizardGeneratorStep {
    formGenerators: QueryList<FormGeneratorComponent>;
    getVisibleForms(): WizardStepForms;
    submitForms(skipIfUntouched?: boolean): Subject<WizardStepSubmittedForms | null>;
    updateFormsState(): Promise<void>;
    refreshFormsVisibility(): Promise<void>;
}
