import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/core/slider';

@Component({
    selector: 'fd-slider-ticks-and-labels-example',
    templateUrl: './slider-ticks-and-labels-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SliderComponent, FormsModule]
})
export class SliderTicksAndLabelsExampleComponent {
    value = 25;
    value1 = 25;
}
