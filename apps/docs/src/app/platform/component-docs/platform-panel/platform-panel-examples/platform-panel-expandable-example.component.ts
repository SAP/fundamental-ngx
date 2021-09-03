import { Component } from '@angular/core';

import { PanelExpandChangeEvent } from '@fundamental-ngx/platform/panel';

@Component({
    selector: 'fdp-platform-panel-expandable-example',
    templateUrl: './platform-panel-expandable-example.component.html'
})
export class PlatformPanelExpandableExampleComponent {
    public expanded = true;

    public onExpandChange(event: PanelExpandChangeEvent): void {
        this.expanded = event.payload;
    }
}
