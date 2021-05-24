import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

@NgModule({
    imports: [CommonModule, BusyIndicatorModule],
    exports: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    declarations: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent]
})
export class CarouselModule {}
