import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormControlModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { TextAreaComponent } from './text-area.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormControlModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule
    ],
    exports: [TextAreaComponent, PlatformContentDensityDeprecationsModule],
    declarations: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
