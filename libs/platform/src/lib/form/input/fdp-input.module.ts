import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, FormModule, FormsModule, PipeModule, ContentDensityModule],
    exports: [InputComponent, ContentDensityModule]
})
export class PlatformInputModule {}
