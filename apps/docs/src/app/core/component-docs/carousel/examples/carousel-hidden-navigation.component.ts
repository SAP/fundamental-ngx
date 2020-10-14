import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-carousel-hidden-navigation',
    templateUrl: './carousel-hidden-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CarouselHiddenNavigationComponent {}
