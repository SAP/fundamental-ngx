import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-loading-content-example',
    templateUrl: './carousel-loading-content-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CarouselComponent, CarouselItemComponent, ButtonComponent]
})
export class CarouselLoadingContentExampleComponent {
    loading = true;
}
