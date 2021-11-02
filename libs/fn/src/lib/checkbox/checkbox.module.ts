import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperimentalCheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
    declarations: [ExperimentalCheckboxComponent],
    imports: [CommonModule, FormsModule],
    exports: [ExperimentalCheckboxComponent]
})
export class ExperimentalCheckboxModule {}
