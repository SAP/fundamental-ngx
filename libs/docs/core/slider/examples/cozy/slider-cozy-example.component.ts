import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { SliderComponent } from '@fundamental-ngx/core/slider';

@Component({
    selector: 'fd-slider-cozy-example',
    templateUrl: './slider-cozy-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SliderComponent, ContentDensityDirective, FormsModule]
})
export class SliderCozyExampleComponent {
    value = 20;
}
