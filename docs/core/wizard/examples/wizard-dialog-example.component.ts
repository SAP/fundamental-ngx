import { Component, QueryList, TemplateRef, ViewChildren, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-wizard-dialog-example',
    templateUrl: './wizard-dialog-example.component.html',
    styleUrls: ['./wizard-dialog-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [WizardService]
})
export class WizardDialogExampleComponent {
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';
    step4status: WizardStepStatus = 'upcoming';
    summaryStatus: WizardStepStatus = 'upcoming';

    fullName = '';
    addressLine1 = '';
    addressLine2 = '';

    currentStep = 1;

    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    constructor(private _dialogService: DialogService, private _wizardService: WizardService) {}

    statusChanged(stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            this.goToStep(stepNumber);
        }
    }

    openDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            width: '100%',
            height: '100%'
        });
    }

    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }

    goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.step1status = 'current';
                this.step2status = 'upcoming';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                this.currentStep = 1;
                break;
            }
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                this.currentStep = 2;
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                this.currentStep = 3;
                break;
            }
            case 4: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'current';
                this.summaryStatus = 'upcoming';
                this.currentStep = 4;
                break;
            }
            case 5: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'completed';
                this.summaryStatus = 'current';
                this.currentStep = 5;
                break;
            }
        }
    }
}
