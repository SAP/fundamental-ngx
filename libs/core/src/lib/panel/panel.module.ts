import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel.component';
import { PanelHeaderDirective } from './panel-header/panel-header.directive';
import { PanelTitleDirective } from './panel-title/panel-title.directive';

@NgModule({
    declarations: [
        PanelComponent,
        PanelHeaderDirective,
        PanelTitleDirective

    ],
    imports: [CommonModule],
    exports: [
        PanelComponent,
        PanelHeaderDirective,
        PanelTitleDirective
    ]
})
export class PanelModule { }
