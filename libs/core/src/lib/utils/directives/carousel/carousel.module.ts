import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { direction: Hammer.DIRECTION_ALL }
    }
}


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
