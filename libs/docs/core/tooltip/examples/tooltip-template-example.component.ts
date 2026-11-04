import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-template-example',
    templateUrl: './tooltip-template-example.component.html',
    styles: [
        `
            .fd-tooltip-template-example {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }

            .fd-tooltip-template-example__content {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                vertical-align: top;
            }

            .fd-tooltip-template-example__icon {
                color: inherit;
            }
        `
    ],
    imports: [ButtonComponent, IconComponent, TooltipDirective]
})
export class TooltipTemplateExampleComponent {}
