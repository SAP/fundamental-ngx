import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Image } from './image';

@NgModule({
  imports: [CommonModule],
  exports: [Image],
  declarations: [Image]
})
export class ImageModule {}
