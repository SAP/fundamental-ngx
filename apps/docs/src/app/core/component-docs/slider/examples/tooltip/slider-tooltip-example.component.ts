import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-slider-tooltip-example',
    templateUrl: './slider-tooltip-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderTooltipExampleComponent {
    value = 50;
    value1 = 0;
}
