import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { SliderChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-slider-basic-example',
    templateUrl: './slider-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SliderBasicExampleComponent {
    value1 = 50;
    value2 = 0;
    value3 = 0;
    value4 = 0;

    onSliderChange1(event: SliderChangeEvent<number>): void {
        console.log('Basic example 1: ', event);
        this.value1 = event.payload;
    }

    onSliderChange2(event: SliderChangeEvent<number>): void {
        console.log('Basic example 2: ', event);
        this.value2 = event.payload;
    }
}
