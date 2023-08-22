import { Component } from '@angular/core';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-panel-expandable-example',
    templateUrl: './panel-expandable-example.component.html',
    standalone: true,
    imports: [ButtonModule, PanelModule]
})
export class PanelExpandableExampleComponent {
    expanded = true;
}
