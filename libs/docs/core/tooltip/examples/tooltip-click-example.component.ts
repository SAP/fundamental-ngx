import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-click-example',
    templateUrl: './tooltip-click-example.component.html',
    styles: [
        `
            .fd-tooltip-click-example {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
                margin-block: 0.5rem;
            }
        `
    ],
    imports: [ButtonComponent, TooltipDirective]
})
export class TooltipClickExampleComponent {}
