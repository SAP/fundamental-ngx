import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormGroupModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { PlatformCheckboxModule } from '../checkbox/checkbox.module';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    imports: [
        CommonModule,
        PlatformCheckboxModule,
        FormsModule,
        FormGroupModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [CheckboxGroupComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule],
    declarations: [CheckboxGroupComponent]
})
export class PlatformCheckboxGroupModule {}
