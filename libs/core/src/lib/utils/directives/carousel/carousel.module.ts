import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';

@NgModule({
    imports: [CommonModule],
    exports: [CarouselItemDirective, CarouselDirective],
    declarations: [CarouselItemDirective, CarouselDirective]
})
export class CarouselModule {}
