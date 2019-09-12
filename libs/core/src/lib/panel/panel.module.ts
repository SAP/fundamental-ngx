import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { PanelHeadComponent } from './panel-head/panel-head.component';
import { PanelTitleDirective } from './panel-title/panel-title.directive';
import { PanelDescriptionComponent } from './panel-description/panel-description.component';
import { PanelActionsComponent } from './panel-actions/panel-actions.component';
import { PanelFiltersComponent } from './panel-filters/panel-filters.component';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { PanelFooterComponent } from './panel-footer/panel-footer.component';
@NgModule({
    declarations: [
        PanelComponent,
        PanelHeaderComponent,
        PanelHeadComponent,
        PanelTitleDirective,
        PanelDescriptionComponent,
        PanelActionsComponent,
        PanelFiltersComponent,
        PanelBodyComponent,
        PanelFooterComponent,
    ],
    imports: [CommonModule],
    exports: [
        PanelComponent,
        PanelHeaderComponent,
        PanelHeadComponent,
        PanelTitleDirective,
        PanelDescriptionComponent,
        PanelActionsComponent,
        PanelFiltersComponent,
        PanelBodyComponent,
        PanelFooterComponent,
    ]
})
export class PanelModule {}
