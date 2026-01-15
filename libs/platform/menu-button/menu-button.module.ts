import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { MenuButtonComponent } from './menu-button.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [MenuButtonComponent, ContentDensityModule],
    exports: [MenuButtonComponent, ContentDensityModule]
})
export class PlatformMenuButtonModule {}
