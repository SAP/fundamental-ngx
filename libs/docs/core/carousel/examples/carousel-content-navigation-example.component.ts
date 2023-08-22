import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'fd-carousel-content-navigation-example',
    templateUrl: './carousel-content-navigation-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet, CarouselComponent, CarouselItemComponent]
})
export class CarouselContentNavigationExampleComponent {}
