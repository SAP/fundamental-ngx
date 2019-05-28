import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ToggleComponent],
    imports: [CommonModule, FormsModule],
    exports: [ToggleComponent]
})
export class ToggleModule {}
