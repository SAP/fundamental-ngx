import { NgModule } from '@angular/core';

import { PanelContentDirective } from './panel-content/panel-content.directive';
import { PanelTitleDirective } from './panel-title/panel-title.directive';
import { PanelComponent } from './panel.component';

/**
 * @deprecated
 * Use direct imports of PanelComponent, PanelContentDirective, PanelTitleDirective
 */
@NgModule({
    imports: [PanelComponent, PanelContentDirective, PanelTitleDirective],
    exports: [PanelComponent, PanelContentDirective, PanelTitleDirective]
})
export class PanelModule {}
