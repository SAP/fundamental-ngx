import { Component, ViewEncapsulation } from '@angular/core';

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
    step1status = 'current';
}
