import { Component, QueryList, ViewChildren } from '@angular/core';
import { TabPanelComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-tab-selection-example',
    templateUrl: './tab-selection-example.component.html'
})
export class TabSelectionExampleComponent {

    @ViewChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;
}
