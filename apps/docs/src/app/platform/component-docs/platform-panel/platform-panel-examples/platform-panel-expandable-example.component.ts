import { Component } from '@angular/core';
import { PanelExpandChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-panel-expandable-example',
    templateUrl: './platform-panel-expandable-example.component.html'
})
export class PlatformPanelExpandableExampleComponent {
    public expanded = true;

    public onExpandChange(event: PanelExpandChangeEvent): void {
        this.expanded = event.payload;
    }
}
