import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-slider-cozy-example',
    templateUrl: './slider-cozy-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SliderCozyExampleComponent {
    value = 20;
}
