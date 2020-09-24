import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
    declarations: [CarouselComponent, CarouselItemComponent],
    imports: [CommonModule],
    exports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselNewModule {}
