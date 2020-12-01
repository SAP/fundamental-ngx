import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-carousel-hidden-navigation-example',
    templateUrl: './carousel-hidden-navigation-example.component.html',
    styles: ['img {pointer-events: none;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselHiddenNavigationExampleComponent {}
