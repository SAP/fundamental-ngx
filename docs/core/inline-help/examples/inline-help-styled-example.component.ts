import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-inline-help-styled-example',
    templateUrl: './inline-help-styled-example.component.html',
    styles: [
        `
            .fd-custom-inline-help-body {
                padding: 0.5rem !important;
                text-align: center;
                min-width: 15rem;
                color: red;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class InlineHelpStyledExampleComponent {}
