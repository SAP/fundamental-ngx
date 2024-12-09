import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/platform/slider';

@Component({
    selector: 'fdp-slider-ticks-and-labels-example',
    templateUrl: './slider-ticks-and-labels-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SliderComponent, FormsModule]
})
export class SliderTicksAndLabelsExampleComponent {
    value = 25;
    value1 = 25;
}
