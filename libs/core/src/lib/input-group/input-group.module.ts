import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputGroupComponent } from './input-group.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import {
    InputGroupAddOnDirective,
    InputGroupInputDirective,
    InputGroupTextareaDirective
} from './input-group-directives';

@NgModule({
    declarations: [
        InputGroupComponent,
        InputGroupInputDirective,
        InputGroupTextareaDirective,
        InputGroupAddOnDirective
    ],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
    exports: [
        InputGroupComponent,
        InputGroupInputDirective,
        InputGroupTextareaDirective,
        InputGroupAddOnDirective
    ]
})
export class InputGroupModule { }
