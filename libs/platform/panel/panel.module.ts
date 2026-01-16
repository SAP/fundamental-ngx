import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { PanelActionsComponent } from './panel-actions.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { PanelComponent } from './panel.component';

const components = [PanelComponent, PanelContentComponent, PanelActionsComponent, ContentDensityModule];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class PlatformPanelModule {}
