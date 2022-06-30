import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CarouselService } from './carousel.service';

@NgModule({
    imports: [CommonModule, BusyIndicatorModule, ButtonModule, I18nModule],
    exports: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    declarations: [CarouselItemDirective, CarouselDirective, CarouselComponent, CarouselItemComponent],
    providers: [CarouselService]
})
export class CarouselModule {}
