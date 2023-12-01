import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PanelContentDirective } from './panel-content/panel-content.directive';
import { PanelTitleDirective } from './panel-title/panel-title.directive';
import { PanelComponent } from './panel.component';

/**
 * @deprecated
 * Use direct imports of PanelComponent, PanelContentDirective, PanelTitleDirective
 */
@NgModule({
    imports: [PanelComponent, PanelContentDirective, PanelTitleDirective, ContentDensityModule],
    exports: [PanelComponent, PanelContentDirective, PanelTitleDirective, ContentDensityModule]
})
export class PanelModule {}
