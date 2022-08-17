import { Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { WizardService } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-wizard-mobile-example',
    templateUrl: './wizard-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .fd-wizard-mobile-docs .fd-wizard {
                max-width: 300px;
                margin-bottom: 2rem;
            }
        `
    ],
    host: {
        class: 'fd-wizard-mobile-docs'
    },
    providers: [WizardService]
})
export class WizardMobileExampleComponent {
    contentHeight = '450px';
    example1step1status: WizardStepStatus = 'current';
    example1step2status: WizardStepStatus = 'upcoming';
    example1step3status: WizardStepStatus = 'upcoming';

    example2step1status: WizardStepStatus = 'current';
    example2step2status: WizardStepStatus = 'upcoming';
    example2step3status: WizardStepStatus = 'upcoming';

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    constructor(private _wizardService: WizardService) {}

    statusChanged(exampleNumber: number, stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            if (exampleNumber === 1) {
                this.example1goToStep(stepNumber);
            } else if (exampleNumber === 2) {
                this.example2goToStep(stepNumber);
            }
        }
    }

    example1goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.example1step1status = 'current';
                this.example1step2status = 'upcoming';
                this.example1step3status = 'upcoming';
                break;
            }
            case 2: {
                this.example1step1status = 'completed';
                this.example1step2status = 'current';
                this.example1step3status = 'upcoming';
                break;
            }
            case 3: {
                this.example1step1status = 'completed';
                this.example1step2status = 'completed';
                this.example1step3status = 'current';
                break;
            }
        }
    }

    example2goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.example2step1status = 'current';
                this.example2step2status = 'upcoming';
                this.example2step3status = 'upcoming';
                break;
            }
            case 2: {
                this.example2step1status = 'completed';
                this.example2step2status = 'current';
                this.example2step3status = 'upcoming';
                break;
            }
            case 3: {
                this.example2step1status = 'completed';
                this.example2step2status = 'completed';
                this.example2step3status = 'current';
                break;
            }
        }
    }

    finish1Wizard(): void {
        alert('Wizard steps are completed.');
        this.example1goToStep(1);
    }

    finish2Wizard(): void {
        alert('Wizard steps are completed.');
        this.example2goToStep(1);
    }

    // Handle focus on key press first example
    /** @hidden */
    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }

    // Handle focus on key press second example
    /** @hidden */
    handleFocus1(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }
}
