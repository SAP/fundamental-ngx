import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-slider-cozy-example',
    templateUrl: './slider-cozy-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderCozyExampleComponent {
    value = 20;
}
