import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-one-active-item-example',
    templateUrl: './carousel-one-active-item-example.component.html',
    styles: ['fd-carousel:focus {outline: 1px dotted}', 'img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselOneActiveItemExampleComponent {}
