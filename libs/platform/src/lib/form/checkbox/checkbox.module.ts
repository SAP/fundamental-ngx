import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { CheckboxComponent } from './checkbox.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        FormItemModule,
        ContentDensityModule
    ],
    exports: [CheckboxComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformCheckboxModule {}
