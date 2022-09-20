import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

import { LayoutPanelComponent } from './layout-panel.component';
import { LayoutPanelHeaderComponent } from './layout-panel-header/layout-panel-header.component';
import { LayoutPanelHeadComponent } from './layout-panel-head/layout-panel-head.component';
import { LayoutPanelTitleDirective } from './layout-panel-title/layout-panel-title.directive';
import { LayoutPanelDescriptionComponent } from './layout-panel-description/layout-panel-description.component';
import { LayoutPanelActionsComponent } from './layout-panel-actions/layout-panel-actions.component';
import { LayoutPanelFiltersComponent } from './layout-panel-filters/layout-panel-filters.component';
import { LayoutPanelBodyComponent } from './layout-panel-body/layout-panel-body.component';
import { LayoutPanelFooterComponent } from './layout-panel-footer/layout-panel-footer.component';
@NgModule({
    declarations: [
        LayoutPanelComponent,
        LayoutPanelHeaderComponent,
        LayoutPanelHeadComponent,
        LayoutPanelTitleDirective,
        LayoutPanelDescriptionComponent,
        LayoutPanelActionsComponent,
        LayoutPanelFiltersComponent,
        LayoutPanelBodyComponent,
        LayoutPanelFooterComponent
    ],
    imports: [CommonModule, SkeletonModule],
    exports: [
        LayoutPanelComponent,
        LayoutPanelHeaderComponent,
        LayoutPanelHeadComponent,
        LayoutPanelTitleDirective,
        LayoutPanelDescriptionComponent,
        LayoutPanelActionsComponent,
        LayoutPanelFiltersComponent,
        LayoutPanelBodyComponent,
        LayoutPanelFooterComponent
    ]
})
export class LayoutPanelModule {}
