import { DynamicFormGroup, SubmitFormEventResult } from '@fundamental-ngx/platform/form';

export interface WizardGeneratorFormsValue {
    [key: string]: WizardStepFormsValue;
}

export interface WizardStepFormsValue {
    [key: string]: {
        [key: string]: any;
    };
}

export interface WizardVisibleSteps {
    [key: string]: boolean;
}

export interface WizardGeneratorDependencyFields {
    [key: string]: {
        [key: string]: string[];
    };
}

export interface WizardStepSubmittedForms {
    [key: string]: SubmitFormEventResult;
}

export interface WizardStepForms {
    [key: string]: {
        title: string;
        form: DynamicFormGroup;
    };
}
