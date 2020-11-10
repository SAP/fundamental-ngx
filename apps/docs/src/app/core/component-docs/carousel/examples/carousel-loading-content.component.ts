import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-loading-content',
    templateUrl: './carousel-loading-content.component.html',
    styles: ['fd-carousel:focus {outline: 1px dotted}', 'img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselLoadingContentComponent {
    loading = true;
}
