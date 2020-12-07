import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';
import { PopoverModule } from '../../popover/popover.module';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [FormControlComponent],
    declarations: [FormControlComponent]
})
export class FormControlModule {}
