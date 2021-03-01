import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-slider-ticks-and-labels-example',
    templateUrl: './slider-ticks-and-labels-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SliderTicksAndLabelsExampleComponent {
    value = 25;
    value1 = 25;
}
