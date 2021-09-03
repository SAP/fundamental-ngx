import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwitchModule } from '@fundamental-ngx/core/switch';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, SwitchModule],
    exports: [SwitchComponent]
})
export class PlatformSwitchModule {}
