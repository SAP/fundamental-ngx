import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DeprecatedButtonContentDensityDirective } from './deprecated-button-content-density.directive';

@NgModule({
    imports: [ContentDensityModule, ButtonComponent, DeprecatedButtonContentDensityDirective],
    exports: [ButtonComponent, ContentDensityModule, DeprecatedButtonContentDensityDirective]
})
export class ButtonModule {}
