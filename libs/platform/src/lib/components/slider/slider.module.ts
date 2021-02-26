import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderModule } from '@fundamental-ngx/core';

import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, SliderModule, FormsModule],
  exports: [SliderComponent]
})
export class PlatformSliderModule { }
