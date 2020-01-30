import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyIndicatorComponent } from './busy-indicator.component';

@NgModule({
  declarations: [BusyIndicatorComponent],
  exports: [BusyIndicatorComponent],
  imports: [
    CommonModule
  ]
})
export class BusyIndicatorModule { }
