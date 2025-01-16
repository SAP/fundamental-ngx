import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PanelComponent, PanelContentDirective, PanelTitleDirective } from '@fundamental-ngx/core/panel';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-panel-expandable-example',
    templateUrl: './panel-expandable-example.component.html',
    imports: [ButtonComponent, PanelComponent, TextComponent, PanelTitleDirective, PanelContentDirective]
})
export class PanelExpandableExampleComponent {
    expanded = true;
}
