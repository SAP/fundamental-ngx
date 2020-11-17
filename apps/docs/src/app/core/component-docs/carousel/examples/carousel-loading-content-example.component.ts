import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-loading-content-example',
    templateUrl: './carousel-loading-content-example.component.html',
    styles: ['fd-carousel:focus {outline: 1px dotted}', 'img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselLoadingContentExampleComponent {
    loading = true;
}
