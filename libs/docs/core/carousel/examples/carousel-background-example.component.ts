import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CarouselItemComponent } from '@fundamental-ngx/core/carousel';
import { CarouselComponent } from '@fundamental-ngx/core/carousel';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'fd-carousel-background-example',
    templateUrl: './carousel-background-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet, CarouselComponent, CarouselItemComponent]
})
export class CarouselBackgroundExampleComponent {}
