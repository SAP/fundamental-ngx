import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { WizardGeneratorItem, WizardStepFormsValue } from '../../../interfaces/wizard-generator-item.interface';
import { WizardGeneratorService } from '../../../wizard-generator.service';
import { WizardStepForms } from '../../wizard-generator-step/wizard-generator-step.component';

export interface FormattedFormStep {
    title: string;
    items: FormattedFormStepItem[];
}

export interface FormattedFormStepItem {
    label: string;
    value: any;
}

@Component({
    selector: 'fdp-wizard-summary-section',
    templateUrl: './wizard-summary-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class WizardSummarySectionComponent implements OnInit {

    /**
     * @description Current step for the section.
     */
    @Input()
    step: WizardGeneratorItem;

    /**
     * @description Step forms values.
     */
    @Input()
    stepValue: WizardStepFormsValue;

    /**
     * @hidden
     */
    _componentForms: WizardStepForms;

    /**
     * @hidden
     */
    _formattedStepValue: FormattedFormStep[] = [];

    /** @hidden */
    constructor(
        private _wizardGeneratorService: WizardGeneratorService
    ) { }

    /**
     * @hidden
     */
    ngOnInit(): void {

        const component = this._wizardGeneratorService.stepsComponents.get(this.step.id);

        this._componentForms = component?.getForms();

        this._formatStepValue();
    }

    /**
     * @description Sets current step on wizard.
     * @param event Mouse click event to prevent.
     */
    editStep(event: MouseEvent): void {
        event.preventDefault();
        this._wizardGeneratorService.editStep(this.step.id);
    }

    /** @hidden */
    private _formatStepValue(): void {

        if (!this._componentForms) {
            return;
        }

        const formattedStepValue = [];

        this.step.formGroups.forEach((formGroup) => {
            const formId = formGroup.id;

            const form = this._componentForms[formId];

            // Form might be skipped due to conditional rendering
            if (!form) {
                return;
            }

            const formattedForm: FormattedFormStep = {
                title: form.title,
                items: Object.entries(this.stepValue[formId]).map(([key, value]) => {
                    return {
                        label: form.form.controls[key].formItem.message as string,
                        value: value
                    }
                })
            };

            formattedStepValue.push(formattedForm);
        });

        this._formattedStepValue = formattedStepValue;
    }
}
