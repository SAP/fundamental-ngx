import { Component, ViewEncapsulation } from '@angular/core';

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
            .fd-wizard-mobile-docs .fd-wizard__content {
                min-height: 300px;
            }
        `
    ],
    host: {
        class: 'fd-wizard-mobile-docs'
    }
})
export class WizardMobileExampleComponent {
    step1status = 'current';
    step2status = 'upcoming';
    step3status = 'upcoming';

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
