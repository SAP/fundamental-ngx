import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-wizard-next-step',
    templateUrl: './wizard-next-step.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./wizard-next-step.component.scss']
})
export class WizardNextStepComponent {

    /**
     * Whether or not the next step button should float directly above the footer.
     */
    @Input()
    floating = false;

}
