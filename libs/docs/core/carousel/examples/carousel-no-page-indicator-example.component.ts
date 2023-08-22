import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-no-page-indicator-example',
    templateUrl: './carousel-no-page-indicator-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselNoPageIndicatorExampleComponent {}
