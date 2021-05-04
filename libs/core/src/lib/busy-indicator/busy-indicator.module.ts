import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyIndicatorComponent } from './busy-indicator.component';
import { FormModule } from '../form/form.module';

@NgModule({
    declarations: [BusyIndicatorComponent],
    exports: [BusyIndicatorComponent],
    imports: [CommonModule, FormModule]
})
export class BusyIndicatorModule {}
