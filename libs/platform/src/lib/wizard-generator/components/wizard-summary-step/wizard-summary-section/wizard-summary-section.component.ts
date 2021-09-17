import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';

import { WizardStepFormsValue } from '../../../interfaces/wizard-generator-item.interface';
import { FormattedFormStep, WizardGeneratorSummaryItem } from '../../../interfaces/wizard-generator-summary-item.interface';
import { WizardGeneratorService } from '../../../wizard-generator.service';
import { WizardStepForms } from '../../wizard-generator-step/wizard-generator-step.component';

@Component({
    selector: 'fdp-wizard-summary-section',
    templateUrl: './wizard-summary-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class WizardSummarySectionComponent {

    /**
     * @description Current step for the section.
     */
    @Input()
    step: WizardGeneratorSummaryItem;

    /**
     * Emits when step edit button clicked.
     */
    @Output()
    editStep = new EventEmitter<string>();

    /**
     * @hidden
     * @description Sets current step on wizard.
     * @param event Mouse click event to prevent.
     */
    _editStep(event: MouseEvent): void {
        event.preventDefault();
        this.editStep.emit(this.step.id);
    }

    /** @hidden */
    _trackFn(_: number, form: FormattedFormStep): string {
        return form.id;
    }
}
