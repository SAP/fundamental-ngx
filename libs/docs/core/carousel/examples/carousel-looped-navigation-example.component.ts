import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-looped-navigation-example',
    templateUrl: './carousel-looped-navigation-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselLoopedNavigationExampleComponent {}
