import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwitchModule } from '@fundamental-ngx/core/switch';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { SwitchComponent } from './switch/switch.component';
import { PlatformContentDensityDeprecationsModule } from "@fundamental-ngx/platform/content-density-deprecations";

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, SwitchModule, PipeModule, PlatformContentDensityDeprecationsModule],
    exports: [SwitchComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformSwitchModule {}
