import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/platform/slider';

@Component({
    selector: 'fdp-slider-disabled-example',
    templateUrl: './slider-disabled-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SliderComponent, FormsModule]
})
export class SliderDisabledExampleComponent {
    value = 20;
}
