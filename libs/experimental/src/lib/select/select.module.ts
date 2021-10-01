import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalSelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ExperimentalSelectComponent],
    imports: [CommonModule, FormsModule],
    exports: [ExperimentalSelectComponent]
})
export class ExperimentalSelectModule {}
