import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent } from './input-group.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
    declarations: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent],
    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
    exports: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent]
})
export class InputGroupModule {}
