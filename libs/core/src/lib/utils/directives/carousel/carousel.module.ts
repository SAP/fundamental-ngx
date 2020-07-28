import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './hammer.config';

@NgModule({
    imports: [CommonModule],
    exports: [CarouselItemDirective, CarouselDirective],
    declarations: [CarouselItemDirective, CarouselDirective],
    providers: [ {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerConfig
    }]
})
export class CarouselModule {}
