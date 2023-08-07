import { NgModule } from '@angular/core';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from './checkbox.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        FormItemModule,
        ContentDensityModule,
        CheckboxComponent
    ],
    exports: [CheckboxComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformCheckboxModule {}
