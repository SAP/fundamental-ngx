import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwitchModule } from '@fundamental-ngx/core/switch';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, SwitchModule, PipeModule],
    exports: [SwitchComponent]
})
export class PlatformSwitchModule {}
