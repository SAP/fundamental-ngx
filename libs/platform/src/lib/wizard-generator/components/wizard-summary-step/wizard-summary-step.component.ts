import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { WizardGeneratorFormsValue, WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import { WizardGeneratorService } from '../../wizard-generator.service';

@Component({
    selector: 'fdp-wizard-summary-step',
    templateUrl: './wizard-summary-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class WizardSummaryStepComponent {

    /**
     * @hidden
     */
    _submittedForms: WizardGeneratorFormsValue;

    /**
     * @description Summary step status.
     */
    @Input()
    set status(status: WizardStepStatus) {
        if (status === 'current') {
            this._wizardGeneratorService.getWizardFormValue(true).then(forms => {
                this._submittedForms = forms;

                this._wizardSteps = this._wizardGeneratorService.items.filter((i) => this._submittedForms[i.id] !== undefined);

                this._shouldRender = true;

                this._cd.detectChanges();
            });
        } else {
            this._shouldRender = false;
        }

        this._cd.detectChanges();
    }

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
        private _cd: ChangeDetectorRef
    ) { }

    /**
     * @hidden
     * @param index
     * @returns step index
     */
    _trackFn(index: number): number {
        return index;
    }
}
