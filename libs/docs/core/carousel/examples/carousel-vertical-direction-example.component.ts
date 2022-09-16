import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-vertical-direction-example',
    templateUrl: './carousel-vertical-direction-example.component.html',
    styles: ['img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselVerticalDirectionExampleComponent {}
