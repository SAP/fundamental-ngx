import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-loading-content-example',
    templateUrl: './carousel-loading-content-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CarouselComponent, CarouselItemComponent, ButtonModule]
})
export class CarouselLoadingContentExampleComponent {
    loading = true;
}
