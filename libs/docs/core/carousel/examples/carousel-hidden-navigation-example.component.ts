import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-hidden-navigation-example',
    templateUrl: './carousel-hidden-navigation-example.component.html',
    styles: ['img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselHiddenNavigationExampleComponent {}
