import { NgModule } from '@angular/core';

import { FormGroupModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
    imports: [FormGroupModule, ContentDensityModule, CheckboxGroupComponent],
    exports: [CheckboxGroupComponent, ContentDensityModule]
})
export class PlatformCheckboxGroupModule {}
