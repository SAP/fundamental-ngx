import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from './checkbox.component';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, CheckboxModule, PipeModule, FormItemModule, ContentDensityModule],
    exports: [CheckboxComponent, ContentDensityModule]
})
export class PlatformCheckboxModule {}
