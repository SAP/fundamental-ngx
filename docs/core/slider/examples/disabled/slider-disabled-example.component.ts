import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-slider-disabled-example',
    templateUrl: './slider-disabled-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderDisabledExampleComponent {
    value = 20;
}
