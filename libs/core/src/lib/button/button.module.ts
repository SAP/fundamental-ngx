import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, ContentDensityModule, ButtonComponent],
    exports: [ButtonComponent, ContentDensityModule]
})
export class ButtonModule {}
