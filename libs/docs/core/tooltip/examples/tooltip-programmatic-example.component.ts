import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-programmatic-example',
    templateUrl: './tooltip-programmatic-example.component.html',
    styles: [
        `
            .fd-tooltip-programmatic-example {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }
        `
    ],
    imports: [ButtonComponent, TooltipDirective]
})
export class TooltipProgrammaticExampleComponent {}
