import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-slider-ticks-and-labels-example',
    templateUrl: './slider-ticks-and-labels-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderTicksAndLabelsExampleComponent {
    value = 25;
    value1 = 25;
}
