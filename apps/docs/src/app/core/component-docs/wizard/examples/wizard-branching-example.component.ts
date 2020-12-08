import { Component, Input, ViewEncapsulation } from '@angular/core';
import { WizardStepStatus } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-wizard-branching-example',
    templateUrl: './wizard-branching-example.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardBranchingExampleComponent {
    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';

    @Input()
    paymentSelection: any;

    goToStep(step: number): void {
        switch (step) {
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                break;
            }
        }
    }
}
