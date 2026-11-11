import { Component } from '@angular/core';
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
                gap: 2rem;
                margin-block: 2rem;
            }

            .fd-tooltip-placement-example__label {
                min-width: 4rem;
                text-transform: capitalize;
            }

            .fd-tooltip-placement-example__box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 6rem;
                height: 4.5rem;
                box-sizing: border-box;
                background: var(--sapGroup_ContentBackground);
                border: 0.0625rem solid var(--sapList_BorderColor);
                border-radius: var(--sapElement_BorderCornerRadius);
                color: var(--sapTextColor);
                font-family: var(--sapFontFamily);
                font-size: var(--sapFontSize);
            }

            .fd-tooltip-placement-example__box:focus-visible {
                outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);
                outline-offset: 0.125rem;
            }
        `
    ],
    imports: [TooltipDirective]
})
export class TooltipPlacementExampleComponent {
    protected readonly placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];
    protected readonly alignments: TooltipAlignment[] = ['start', 'middle', 'end'];
}
