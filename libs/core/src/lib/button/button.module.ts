import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { IconModule } from '@fundamental-ngx/core/icon';

@NgModule({
    imports: [CommonModule, IconModule],
    exports: [ButtonComponent],
    declarations: [ButtonComponent]
})
export class ButtonModule {}
