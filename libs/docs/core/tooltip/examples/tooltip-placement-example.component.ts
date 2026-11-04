import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { TooltipAlignment, TooltipDirective, TooltipPlacement } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-placement-example',
    templateUrl: './tooltip-placement-example.component.html',
    styles: [
        `
            .fd-tooltip-placement-example {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-block: 1.5rem;
            }

            .fd-tooltip-placement-example__label {
                min-width: 4rem;
                text-transform: capitalize;
            }
        `
    ],
    imports: [ButtonComponent, TooltipDirective]
})
export class TooltipPlacementExampleComponent {
    protected readonly placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];
    protected readonly alignments: TooltipAlignment[] = ['start', 'middle', 'end'];
}
