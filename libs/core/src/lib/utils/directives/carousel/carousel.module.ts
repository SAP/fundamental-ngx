import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';
import { CarouselComponent } from '../../../carousel/carousel.component';
import { CarouselItemComponent } from '../../../carousel/carousel-item/carousel-item.component';
import { CarouselService } from '../../services/carousel.service';

@NgModule({
    imports: [CommonModule],
    exports: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    declarations: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    providers: [CarouselService]
})
export class CarouselModule {}
