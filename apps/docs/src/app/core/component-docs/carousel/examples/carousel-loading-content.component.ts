import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-loading-content',
    templateUrl: './carousel-loading-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselLoadingContentComponent {
    loading = true;
}
