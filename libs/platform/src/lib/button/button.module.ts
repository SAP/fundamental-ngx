import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from './button.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, ButtonModule, PipeModule, ContentDensityModule],
    exports: [ButtonComponent, ContentDensityModule],
    declarations: [ButtonComponent]
})
export class PlatformButtonModule {}
