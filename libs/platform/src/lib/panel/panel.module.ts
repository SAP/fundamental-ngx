import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from '@fundamental-ngx/core/panel';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { PanelComponent } from './panel.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { PanelActionsComponent } from './panel-actions.component';

@NgModule({
    declarations: [PanelComponent, PanelContentComponent, PanelActionsComponent],
    imports: [CommonModule, PanelModule, PipeModule, ContentDensityModule],
    exports: [PanelComponent, PanelContentComponent, PanelActionsComponent, ContentDensityModule]
})
export class PlatformPanelModule {}
