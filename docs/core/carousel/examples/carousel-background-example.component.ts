import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CarouselComponent, CarouselItemComponent } from '@fundamental-ngx/core/carousel';

@Component({
    selector: 'fd-carousel-background-example',
    templateUrl: './carousel-background-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet, CarouselComponent, CarouselItemComponent]
})
export class CarouselBackgroundExampleComponent {}
