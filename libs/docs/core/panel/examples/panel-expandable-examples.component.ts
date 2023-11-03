import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PanelModule } from '@fundamental-ngx/core/panel';

@Component({
    selector: 'fd-panel-expandable-example',
    templateUrl: './panel-expandable-example.component.html',
    standalone: true,
    imports: [ButtonComponent, PanelModule]
})
export class PanelExpandableExampleComponent {
    expanded = true;
}
