import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TOOLTIP_CONFIG, TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-delay-example',
    templateUrl: './tooltip-delay-example.component.html',
    styles: [
        `
            .fd-tooltip-delay-example {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 1rem;
            }
        `
    ],
    providers: [{ provide: TOOLTIP_CONFIG, useValue: { showDelay: 1000 } }],
    imports: [ButtonComponent, TooltipDirective]
})
export class TooltipDelayExampleComponent {}
