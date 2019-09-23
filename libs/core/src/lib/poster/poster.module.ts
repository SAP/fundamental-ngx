import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterComponent } from './poster.component';

@NgModule({
  declarations: [PosterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PosterComponent
  ]
})
export class PosterModule { }
