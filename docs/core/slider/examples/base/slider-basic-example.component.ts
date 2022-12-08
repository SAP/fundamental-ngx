import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-slider-basic-example',
    templateUrl: './slider-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderBasicExampleComponent {
    value = 50;
    value1 = 0;
    value2 = 0;
    value3 = 0;
    value4 = 0;
}
