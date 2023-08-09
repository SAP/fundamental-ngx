import { NgModule } from '@angular/core';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from './checkbox.component';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [
        PipeModule,
        FormItemModule,
        ContentDensityModule,
        CheckboxComponent
    ],
    exports: [CheckboxComponent, ContentDensityModule]
})
export class PlatformCheckboxModule {}
