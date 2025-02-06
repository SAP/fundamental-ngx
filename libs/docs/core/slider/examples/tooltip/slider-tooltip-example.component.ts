import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/core/slider';

@Component({
    selector: 'fd-slider-tooltip-example',
    templateUrl: './slider-tooltip-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SliderComponent, FormsModule]
})
export class SliderTooltipExampleComponent {
    value = 50;
    value1 = 0;
}
