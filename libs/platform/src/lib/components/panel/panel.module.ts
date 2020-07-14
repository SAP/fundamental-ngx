import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule, ToolbarModule } from '@fundamental-ngx/core';

import { PlatformPanelComponent } from './panel.component';
import { PlatformPanelContentComponent } from './panel-content/panel-content.component';
import { PlatformPanelActionsComponent } from './panel-actions/panel-actions.component';

@NgModule({
    declarations: [PlatformPanelComponent, PlatformPanelContentComponent, PlatformPanelActionsComponent],
    imports: [CommonModule, PanelModule, ToolbarModule],
    exports: [PlatformPanelComponent, PlatformPanelContentComponent, PlatformPanelActionsComponent]
})
export class PlatformPanelModule {}
