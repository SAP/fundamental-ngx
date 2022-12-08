import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-slider-tooltip-example',
    templateUrl: './slider-tooltip-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SliderTooltipExampleComponent {
    value = 50;
    value1 = 0;
}
