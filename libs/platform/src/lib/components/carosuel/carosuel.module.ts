import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarosuelComponent } from './carosuel.component';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carosuel-config';
import { PlatformButtonModule } from '../button/button.module';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MyHammerConfig } from './hammerConfig';
import { TileModule } from '@fundamental-ngx/core';

@NgModule({
    imports: [
        CommonModule, PlatformButtonModule, TileModule
    ],
    exports: [CarosuelComponent, SlideComponent],
    declarations: [CarosuelComponent, SlideComponent],
    providers: [CarouselConfig,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        }
    ]
})
export class CarouselModule {
}
