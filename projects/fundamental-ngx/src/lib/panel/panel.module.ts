import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelHeaderComponent } from './panel-header.component';
import { PanelHeadComponent } from './panel-head.component';
import { PanelTitleComponent } from './panel-title.component';
import { PanelDescriptionComponent } from './panel-description.component';
import { PanelActionsComponent } from './panel-actions.component';
import { PanelFiltersComponent } from './panel-filters.component';
import { PanelBodyComponent } from './panel-body.component';
import { PanelFooterComponent } from './panel-footer.component';
import { PanelGridComponent } from './panel-grid.component';
@NgModule({
    declarations: [
        PanelComponent,
        PanelHeaderComponent,
        PanelHeadComponent,
        PanelTitleComponent,
        PanelDescriptionComponent,
        PanelActionsComponent,
        PanelFiltersComponent,
        PanelBodyComponent,
        PanelFooterComponent,
        PanelGridComponent
    ],
    imports: [CommonModule],
    exports: [
        PanelComponent,
        PanelHeaderComponent,
        PanelHeadComponent,
        PanelTitleComponent,
        PanelDescriptionComponent,
        PanelActionsComponent,
        PanelFiltersComponent,
        PanelBodyComponent,
        PanelFooterComponent,
        PanelGridComponent
    ]
})
export class PanelModule {}
