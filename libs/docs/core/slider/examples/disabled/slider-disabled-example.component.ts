import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '@fundamental-ngx/core/slider';

@Component({
    selector: 'fd-slider-disabled-example',
    templateUrl: './slider-disabled-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SliderComponent, FormsModule]
})
export class SliderDisabledExampleComponent {
    value = 20;
}
