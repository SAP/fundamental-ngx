import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-no-page-indicator',
    templateUrl: './carousel-no-page-indicator.component.html',
    styles: ['fd-carousel:focus {outline: 1px dotted}', 'img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselNoPageIndicatorComponent {}
