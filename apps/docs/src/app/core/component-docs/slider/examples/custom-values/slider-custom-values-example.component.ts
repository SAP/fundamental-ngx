import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SliderCustomValue } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-slider-custom-values-example',
    templateUrl: './slider-custom-values-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderCustomValuesExampleComponent {
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

    value = this.customValues[4];
}
