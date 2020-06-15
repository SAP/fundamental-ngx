import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepInputComponent } from './step-input.component';


@NgModule({
    declarations: [StepInputComponent],
    imports: [
        CommonModule
    ],
    exports: [StepInputComponent]
})
export class StepInputModule {}
