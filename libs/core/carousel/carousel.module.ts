import { NgModule } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel.component';
import { CarouselDirective } from './carousel.directive';
import { CarouselService } from './carousel.service';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    exports: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    providers: [CarouselService]
})
export class CarouselModule {}
