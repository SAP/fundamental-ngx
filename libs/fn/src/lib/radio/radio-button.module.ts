import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RadioButtonComponent],
    exports: [RadioButtonComponent],
    imports: [CommonModule, FormsModule]
})
export class RadioButtonModule {}
