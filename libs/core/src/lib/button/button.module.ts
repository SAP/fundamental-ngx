import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, IconModule, ContentDensityModule],
    exports: [ButtonComponent,  ContentDensityModule],
    declarations: [ButtonComponent, ]
})
export class ButtonModule {}
