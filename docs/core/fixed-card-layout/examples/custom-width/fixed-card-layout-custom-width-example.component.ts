import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-custom-width-example',
    templateUrl: './fixed-card-layout-custom-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FixedCardLayoutCustomWidthExampleComponent {
    cardMinimumWidth = 320;
}
