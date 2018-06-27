import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelHeaderComponent } from './panel-header.component';
import { PanelTitleComponent } from './panel-title.component';
import { PanelActionsComponent } from './panel-actions.component';
import { PanelFiltersComponent } from './panel-filters.component';
import { PanelBodyComponent } from './panel-body.component';
import { PanelFooterComponent } from './panel-footer.component';

@NgModule({
    declarations: [
        PanelComponent,
        PanelHeaderComponent,
        PanelTitleComponent,
        PanelActionsComponent,
        PanelFiltersComponent,
        PanelBodyComponent,
        PanelFooterComponent
    ],
    imports: [CommonModule],
    exports: [
        PanelComponent,
        PanelHeaderComponent,
        PanelTitleComponent,
        PanelActionsComponent,
        PanelFiltersComponent,
        PanelBodyComponent,
        PanelFooterComponent
    ]
})
export class PanelModule {}
