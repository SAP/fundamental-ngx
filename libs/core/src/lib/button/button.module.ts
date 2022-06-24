import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DeprecatedButtonContentDensityDirective } from './deprecated-button-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, IconModule, ContentDensityModule],
    exports: [ButtonComponent, DeprecatedButtonContentDensityDirective, ContentDensityModule],
    declarations: [ButtonComponent, DeprecatedButtonContentDensityDirective]
})
export class ButtonModule {}
