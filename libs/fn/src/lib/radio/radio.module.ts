import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalRadioButtonComponent } from './radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ExperimentalRadioButtonComponent],
    exports: [ExperimentalRadioButtonComponent],
    imports: [CommonModule, FormsModule]
})
export class ExperimentalRadioModule {}
