import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/cdk/utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, DisabledBehaviorModule, ReadonlyBehaviorModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent],
    declarations: [InputComponent]
})
export class InputModule {}
