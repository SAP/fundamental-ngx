import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/platform/slider';

@Component({
    selector: 'fdp-slider-tooltip-example',
    templateUrl: './slider-tooltip-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SliderComponent, FormsModule]
})
export class SliderTooltipExampleComponent {
    value = 50;
    value1 = 0;
}
