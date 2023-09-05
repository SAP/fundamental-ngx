import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { SliderComponent } from '@fundamental-ngx/platform/slider';

@Component({
    selector: 'fdp-slider-cozy-example',
    templateUrl: './slider-cozy-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SliderComponent, ContentDensityDirective, FormsModule]
})
export class SliderCozyExampleComponent {
    value = 20;
}
