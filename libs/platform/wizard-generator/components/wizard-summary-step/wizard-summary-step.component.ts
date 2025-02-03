import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';
import { WizardGeneratorFormsValue, WizardStepForms } from '../../interfaces/wizard-generator-forms.interface';
import { WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import {
    FormattedFormStep,
    WizardGeneratorSummaryItem
} from '../../interfaces/wizard-generator-summary-item.interface';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardSummarySectionComponent } from './wizard-summary-section/wizard-summary-section.component';

@Component({
    selector: 'fdp-wizard-summary-step',
    templateUrl: './wizard-summary-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [WizardSummarySectionComponent, NgTemplateOutlet]
})
export class WizardSummaryStepComponent {
    /**
     * @description Summary step status.
     */
    @Input()
    set status(status: WizardStepStatus) {
        if (status === 'current') {
            this._wizardGeneratorService.getWizardFormValue(true).then((forms) => {
                this._submittedForms = forms;

                this._wizardSteps = this._wizardGeneratorService.items.filter(
                    (i) => this._submittedForms[i.id] !== undefined
                );

                this._formatWizardValue().then(() => {
                    this._shouldRender = true;

                    this._cd.detectChanges();
                });
            });
        } else {
            this._shouldRender = false;
        }

        this._cd.detectChanges();
    }

    /**
     * User-defined template for Summary step.
     */
    @Input()
    customSummaryStepTemplate: Nullable<TemplateRef<HTMLElement>>;

    /**
     * Formatted wizard value with steps and their forms.
     */
    formattedWizardValue: WizardGeneratorSummaryItem[] = [];

    /**
     * @hidden
     */
    _submittedForms: WizardGeneratorFormsValue;

    /**
     * @hidden
     */
    _shouldRender = false;

    /**
     * @hidden
     */
    _wizardSteps: WizardGeneratorItem[];

    /** @hidden */
    constructor(
        private _wizardGeneratorService: WizardGeneratorService,
        private _formGeneratorService: FormGeneratorService,
        private _cd: ChangeDetectorRef
    ) {}

    /**
     * Opens defined step for editing.
     * @param stepId Defined step ID.
     */
    editStep(stepId: string): void {
        this._wizardGeneratorService.editStep(stepId);
    }

    /** @hidden */
    _trackFn(_: number, step: WizardGeneratorSummaryItem): string {
        return step.id;
    }

    /** @hidden */
    _editStepFn: (stepId: string) => void = (stepId: string) => this.editStep(stepId);

    /** @hidden */
    private async _formatWizardValue(): Promise<void> {
        this.formattedWizardValue = [];

        for (const step of this._wizardSteps) {
            const component = this._wizardGeneratorService.stepsComponents.get(step.id);
            const componentForms = component?.getVisibleForms();

            if (!componentForms) {
                continue;
            }

            const formattedStepValue = await this._formatStepValue(componentForms, step);

            this.formattedWizardValue.push({
                id: step.id,
                name: step.name as string,
                title: step.title as string,
                forms: formattedStepValue
            });
        }
    }

    /** @hidden */
    private async _formatStepValue(
        componentForms: WizardStepForms,
        step: WizardGeneratorItem
    ): Promise<FormattedFormStep[]> {
        const formattedStepValue: FormattedFormStep[] = [];

        for (const formGroup of step.formGroups ?? []) {
            const formId = formGroup.id;

            const form = componentForms[formId];

            // Form might be skipped due to conditional rendering
            if (!form) {
                continue;
            }

            const formattedFormValue = await this._formGeneratorService.getFormValue(form.form, true);

            const formattedForm: FormattedFormStep = {
                title: form.title,
                id: formId,
                items: Object.keys(this._submittedForms[step.id][formId]).map((key) => {
                    const formItem = this._formGeneratorService.getFormControl(form.form, key).formItem;
                    return {
                        label: formItem.message as string,
                        value: formattedFormValue[key]
                    };
                })
            };

            formattedStepValue.push(formattedForm);
        }

        return formattedStepValue;
    }
}
