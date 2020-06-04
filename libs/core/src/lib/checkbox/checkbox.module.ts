import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule],
    exports: [CheckboxComponent]
})
export class CheckboxModule {}
