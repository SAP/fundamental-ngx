import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-content-navigation-example',
    templateUrl: './carousel-content-navigation-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, CarouselComponent, CarouselItemComponent]
})
export class CarouselContentNavigationExampleComponent {}
