import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-loading-content-example',
    templateUrl: './carousel-loading-content-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselLoadingContentExampleComponent {
    loading = true;
}
