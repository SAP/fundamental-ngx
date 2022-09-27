import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-slider-form-example',
    templateUrl: './slider-form-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderFormExampleComponent {
    customForm = new FormGroup({
        sliderControl: new FormControl(20)
    });
}
