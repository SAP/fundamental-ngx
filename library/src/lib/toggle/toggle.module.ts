import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';
import { ToggleComponent } from './toggle.component';

@NgModule({
    declarations: [ToggleComponent],
    imports: [CommonModule, UtilsModule],
    exports: [ToggleComponent]
})
export class ToggleModule {}
