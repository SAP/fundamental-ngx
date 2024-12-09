import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-no-page-indicator-example',
    templateUrl: './carousel-no-page-indicator-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselNoPageIndicatorExampleComponent {}
