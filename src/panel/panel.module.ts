import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    PanelComponent,
    PanelHeaderComponent,
    PanelTitleComponent,
    PanelActionsComponent,
    PanelFiltersComponent,
    PanelBodyComponent,
    PanelFooterComponent
} from './panel.component';
@NgModule({
    declarations: [PanelComponent, PanelHeaderComponent, PanelTitleComponent, PanelActionsComponent, PanelFiltersComponent, PanelBodyComponent, PanelFooterComponent],
    imports: [CommonModule],
    exports: [PanelComponent, PanelHeaderComponent, PanelTitleComponent, PanelActionsComponent, PanelFiltersComponent, PanelBodyComponent, PanelFooterComponent]
})
export class PanelModule {}
