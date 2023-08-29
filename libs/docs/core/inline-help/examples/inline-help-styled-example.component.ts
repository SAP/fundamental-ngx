import { Component, ViewEncapsulation } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

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
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [IconModule, InlineHelpModule]
})
export class InlineHelpStyledExampleComponent {}
