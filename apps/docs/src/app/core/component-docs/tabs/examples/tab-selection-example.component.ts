import { Component, QueryList, ViewChildren } from '@angular/core';
import { TabPanelComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-tab-selection-example',
    templateUrl: './tab-selection-example.component.html',
    styleUrls: ['tab-selection-example.component.scss']
})
export class TabSelectionExampleComponent {

    @ViewChildren(TabPanelComponent)
    set setTabs(value: QueryList<TabPanelComponent>) {
        this._tabs = value.toArray();
    };

    get tabs(): TabPanelComponent[] {
        return this._tabs;
    }

    private _tabs: TabPanelComponent[];
}
