import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from '@fundamental-ngx/core/panel';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

import { PanelComponent } from './panel.component';
import { PanelContentComponent } from './panel-content/panel-content.component';
import { PanelActionsComponent } from './panel-actions/panel-actions.component';

@NgModule({
    declarations: [PanelComponent, PanelContentComponent, PanelActionsComponent],
    imports: [
        CommonModule,
        PanelModule,
        ToolbarModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [
        PanelComponent,
        PanelContentComponent,
        PanelActionsComponent,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ]
})
export class PlatformPanelModule {}
