import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelContentDirective } from './panel-content/panel-content.directive';
import { PanelExpandComponent } from './panel-expand/panel-expand.component';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { PanelTitleDirective } from './panel-title/panel-title.directive';

@NgModule({
    declarations: [
        PanelComponent,
        PanelContentDirective,
        PanelExpandComponent,
        PanelHeaderComponent,
        PanelTitleDirective

    ],
    imports: [CommonModule],
    exports: [
        PanelComponent,
        PanelContentDirective,
        PanelExpandComponent,
        PanelHeaderComponent,
        PanelTitleDirective
    ]
})
export class PanelModule { }
