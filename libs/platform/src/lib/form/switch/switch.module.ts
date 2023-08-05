import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwitchModule } from '@fundamental-ngx/core/switch';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, SwitchModule, PipeModule, ContentDensityModule],
    exports: [SwitchComponent, ContentDensityModule]
})
export class PlatformSwitchModule {}
