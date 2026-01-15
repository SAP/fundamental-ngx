import { NgModule } from '@angular/core';

import { LayoutPanelActionsComponent } from './layout-panel-actions/layout-panel-actions.component';
import { LayoutPanelBodyComponent } from './layout-panel-body/layout-panel-body.component';
import { LayoutPanelDescriptionComponent } from './layout-panel-description/layout-panel-description.component';
import { LayoutPanelFiltersComponent } from './layout-panel-filters/layout-panel-filters.component';
import { LayoutPanelFooterComponent } from './layout-panel-footer/layout-panel-footer.component';
import { LayoutPanelHeadComponent } from './layout-panel-head/layout-panel-head.component';
import { LayoutPanelHeaderComponent } from './layout-panel-header/layout-panel-header.component';
import { LayoutPanelTitleDirective } from './layout-panel-title/layout-panel-title.directive';
import { LayoutPanelComponent } from './layout-panel.component';

const components = [
    LayoutPanelComponent,
    LayoutPanelHeaderComponent,
    LayoutPanelHeadComponent,
    LayoutPanelTitleDirective,
    LayoutPanelDescriptionComponent,
    LayoutPanelActionsComponent,
    LayoutPanelFiltersComponent,
    LayoutPanelBodyComponent,
    LayoutPanelFooterComponent
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class LayoutPanelModule {}
