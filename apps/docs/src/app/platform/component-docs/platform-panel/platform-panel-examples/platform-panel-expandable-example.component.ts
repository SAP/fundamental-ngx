import { Component, ViewEncapsulation } from '@angular/core';
import { PanelExpandChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-panel-expandable-example',
    templateUrl: './platform-panel-expandable-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformPanelExpandableExampleComponent {
    public expanded: boolean = true;

    public onExpandChange(event: PanelExpandChangeEvent) {
        this.expanded = event.payload;
    }
}
