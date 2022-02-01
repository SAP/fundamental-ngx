import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from '@fundamental-ngx/core/panel';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PipeModule } from '@fundamental-ngx/core/utils';

import { PanelComponent } from './panel.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { PanelActionsComponent } from './panel-actions/panel-actions.component';

@NgModule({
    declarations: [PanelComponent, PanelContentComponent, PanelActionsComponent],
    imports: [CommonModule, PanelModule, ToolbarModule, PipeModule],
    exports: [PanelComponent, PanelContentComponent, PanelActionsComponent]
})
export class PlatformPanelModule {}
