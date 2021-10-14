export interface WizardGeneratorSummaryItem {
    id: string;
    name?: string;
    title?: string;
    forms: FormattedFormStep[];
}

export interface FormattedFormStep {
    title: string;
    id: string;
    items: FormattedFormStepItem[];
}

export interface FormattedFormStepItem {
    label: string;
    value: any;
}
