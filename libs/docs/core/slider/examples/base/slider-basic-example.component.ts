import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/core/slider';

@Component({
    selector: 'fd-slider-basic-example',
    templateUrl: './slider-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SliderComponent, FormsModule]
})
export class SliderBasicExampleComponent {
    value = 50;
    value1 = 0;
    value2 = 0;
    value3 = 0;
    value4 = 0;
}
