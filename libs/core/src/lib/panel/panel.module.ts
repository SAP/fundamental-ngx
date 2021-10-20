import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelContentDirective } from './panel-content/panel-content.directive';
import { PanelTitleDirective } from './panel-title/panel-title.directive';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    declarations: [PanelComponent, PanelContentDirective, PanelTitleDirective],
    imports: [CommonModule, ButtonModule],
    exports: [PanelComponent, PanelContentDirective, PanelTitleDirective]
})
export class PanelModule {}
