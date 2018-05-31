import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Panel, PanelHeader, PanelTitle, PanelActions, PanelFilters, PanelBody, PanelFooter } from './panel';
@NgModule({
  declarations: [
    Panel,
    PanelHeader,
    PanelTitle,
    PanelActions,
    PanelFilters,
    PanelBody,
    PanelFooter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Panel,
    PanelHeader,
    PanelTitle,
    PanelActions,
    PanelFilters,
    PanelBody,
    PanelFooter
  ]
})
export class PanelModule {

}
