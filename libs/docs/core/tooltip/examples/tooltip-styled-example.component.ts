import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-styled-example',
    templateUrl: './tooltip-styled-example.component.html',
    styles: [
        `
            .fd-tooltip-styled-example {
                display: flex;
                justify-content: center;
            }

            .fd-popover__body.fd-tooltip-styled-example__body {
                /* The tooltip background and its arrow both read these properties. */
                --sapGroup_ContentBackground: var(--sapIndicationColor_5_Background);
                --fdPopover_Border_Color: var(--sapIndicationColor_5_BorderColor);

                color: var(--sapIndicationColor_5_TextColor);
                max-width: 25rem;
                text-align: center;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, TooltipDirective]
})
export class TooltipStyledExampleComponent {}
