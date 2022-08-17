import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { InputComponent } from './input.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        FormModule,
        FormsModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [InputComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformInputModule {}
