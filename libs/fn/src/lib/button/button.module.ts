import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@fundamental-ngx/core/icon';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, IconModule, FormsModule],
    exports: [ButtonComponent]
})
export class ButtonModule {}
