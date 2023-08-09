import { NgModule } from '@angular/core';

import { FormGroupModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    imports: [FormGroupModule, PlatformContentDensityDeprecationsModule, ContentDensityModule, CheckboxGroupComponent],
    exports: [CheckboxGroupComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformCheckboxGroupModule {}
