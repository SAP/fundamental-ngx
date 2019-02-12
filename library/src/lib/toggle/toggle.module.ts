import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';
import { ToggleComponent } from './toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ToggleComponent],
    imports: [CommonModule, UtilsModule, FormsModule],
    exports: [ToggleComponent]
})
export class ToggleModule {}
