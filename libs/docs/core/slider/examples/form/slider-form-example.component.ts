import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/core/slider';

@Component({
    selector: 'fd-slider-form-example',
    templateUrl: './slider-form-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, ReactiveFormsModule, SliderComponent]
})
export class SliderFormExampleComponent {
    customForm = new FormGroup({
        sliderControl: new FormControl(20)
    });
}
