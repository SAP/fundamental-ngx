import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputGroupSearch, InputGroupNumber, InputGroupComponent } from './input-group.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
    declarations: [InputGroupSearch, InputGroupNumber, InputGroupComponent],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
    exports: [InputGroupSearch, InputGroupNumber, InputGroupComponent]
})
export class InputGroupModule {}
