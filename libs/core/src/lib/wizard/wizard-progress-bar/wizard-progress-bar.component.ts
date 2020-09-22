import { Component, Input, ViewEncapsulation } from '@angular/core';

export type WizardSize = 's' | 'm' | 'l' | 'xl';

@Component({
    selector: 'fd-wizard-progress-bar',
    templateUrl: './wizard-progress-bar.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./wizard-progress-bar.component.scss']
})
export class WizardProgressBarComponent {
    /**
     * Size of the wizard progress bar.
     */
    @Input()
    size: WizardSize;
}
