import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent, SliderCustomValue } from '@fundamental-ngx/platform/slider';

@Component({
    selector: 'fdp-slider-range-example',
    templateUrl: './slider-range-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SliderComponent, FormsModule, JsonPipe]
})
export class SliderRangeExampleComponent {
    value = [20, 70];

    customValues: SliderCustomValue[] = [
        { value: 1609452000000, label: 'Jan 1' },
        { value: 1609538400000, label: 'Jan 2' },
        { value: 1609624800000, label: 'Jan 3' },
        { value: 1609711200000, label: 'Jan 4' },
        { value: 1609797600000, label: 'Jan 5' },
        { value: 1609884000000, label: 'Jan 6' },
        { value: 1609970400000, label: 'Jan 7' },
        { value: 1610056800000, label: 'Jan 8' },
        { value: 1610143200000, label: 'Jan 9' },
        { value: 1610229600000, label: 'Jan 10' }
    ];

    value2 = [this.customValues[4], this.customValues[6]];
}
