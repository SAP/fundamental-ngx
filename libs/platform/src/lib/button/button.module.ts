import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ButtonComponent } from './button.component';

@NgModule({
    imports: [CommonModule, ButtonModule],
    exports: [ButtonComponent],
    declarations: [ButtonComponent]
})
export class PlatformButtonModule {}
