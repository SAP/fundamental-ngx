import { NgModule } from '@angular/core';
import { SidePanelContentDirective } from './side-panel-content.directive';
import { SidePanelItemComponent } from './side-panel-item.component';
import { SidePanelComponent } from './side-panel.component';

@NgModule({
    imports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective],
    exports: [SidePanelComponent, SidePanelItemComponent, SidePanelContentDirective]
})
export class SidePanelModule {}
