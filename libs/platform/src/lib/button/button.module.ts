import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonComponent } from './button.component';

@NgModule({
    imports: [CommonModule, ButtonModule, PipeModule],
    exports: [ButtonComponent],
    declarations: [ButtonComponent]
})
export class PlatformButtonModule {}
