import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormGroupModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { PlatformCheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
    imports: [CommonModule, PlatformCheckboxModule, FormsModule, FormGroupModule, ContentDensityModule],
    exports: [CheckboxGroupComponent, ContentDensityModule],
    declarations: [CheckboxGroupComponent]
})
export class PlatformCheckboxGroupModule {}
