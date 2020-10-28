import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { PopoverModule } from '../popover/popover.module';

@NgModule({
    declarations: [SliderComponent],
    imports: [
        CommonModule,
        PopoverModule,
        FormsModule
    ],
    exports: [SliderComponent]
})
export class SliderModule {
}
