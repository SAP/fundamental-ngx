import { Component, ViewEncapsulation } from '@angular/core';
import { PanelExpandChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-panel-simple-example',
    templateUrl: './platform-panel-simple-example.component.html',
    styleUrls: ['./platform-panel-simple-example.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformPanelSimpleExampleComponent {
    public expanded: boolean = true;

    public onExpandChange(event: PanelExpandChangeEvent) {
        this.expanded = event.payload;
    }
}
