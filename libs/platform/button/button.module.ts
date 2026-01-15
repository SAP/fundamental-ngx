import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ButtonComponent } from './button.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ButtonComponent, ContentDensityModule],
    exports: [ButtonComponent, ContentDensityModule]
})
export class PlatformButtonModule {}
