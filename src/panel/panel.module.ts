import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent, PanelHeader, PanelTitle, PanelActions, PanelFilters, PanelBody, PanelFooter } from './panel.component';
@NgModule({
    declarations: [PanelComponent, PanelHeader, PanelTitle, PanelActions, PanelFilters, PanelBody, PanelFooter],
    imports: [CommonModule],
    exports: [PanelComponent, PanelHeader, PanelTitle, PanelActions, PanelFilters, PanelBody, PanelFooter]
})
export class PanelModule {}
