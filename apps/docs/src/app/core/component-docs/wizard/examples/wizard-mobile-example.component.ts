import { Component, ViewEncapsulation } from '@angular/core';
import { StepType } from '../../../../../../../../libs/core/src/lib/wizard/wizard-step/wizard-step.component';

@Component({
    selector: 'fd-wizard-mobile-example',
    templateUrl: './wizard-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .fd-wizard-mobile-docs .fd-wizard {
                max-width: 300px;
            }
        `
    ]
})
export class WizardMobileExampleComponent {

    step1status: StepType = 'current';

}
