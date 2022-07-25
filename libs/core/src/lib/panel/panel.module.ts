import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelContentDirective } from './panel-content/panel-content.directive';
import { PanelTitleDirective } from './panel-title/panel-title.directive';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DeprecatedPanelCompactDirective } from './deprecated-panel-compact.directive';

@NgModule({
    declarations: [PanelComponent, PanelContentDirective, PanelTitleDirective, DeprecatedPanelCompactDirective],
    imports: [CommonModule, ButtonModule, ContentDensityModule],
    exports: [
        PanelComponent,
        PanelContentDirective,
        PanelTitleDirective,
        ContentDensityModule,
        DeprecatedPanelCompactDirective
    ]
})
export class PanelModule {}
