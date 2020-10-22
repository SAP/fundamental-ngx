import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-one-active-item',
    templateUrl: './carousel-one-active-item.component.html',
    styles: ['fd-carousel:focus {outline: 1px dotted}', 'img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselOneActiveItemComponent {}
