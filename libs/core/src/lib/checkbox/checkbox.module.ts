import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, FormModule],
    exports: [CheckboxComponent]
})
export class CheckboxModule {}
