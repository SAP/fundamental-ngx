import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalButtonComponent } from './button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ExperimentalButtonComponent],
    imports: [CommonModule, FormsModule],
    exports: [ExperimentalButtonComponent]
})
export class ExperimentalButtonModule {}
