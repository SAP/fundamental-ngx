import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-vertical-direction-example',
    templateUrl: './carousel-vertical-direction-example.component.html',
    styles: ['img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselVerticalDirectionExampleComponent {}
