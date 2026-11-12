import { NgModule } from '@angular/core';
import { SidePanelContentDirective } from './side-panel-content.directive';
import { SidePanelItemComponent } from './side-panel-item.component';
import { SidePanelMainComponent } from './side-panel-main.component';
import { SidePanelComponent } from './side-panel.component';

@NgModule({
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective, SidePanelMainComponent],
    exports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective, SidePanelMainComponent]
})
export class SidePanelModule {}
