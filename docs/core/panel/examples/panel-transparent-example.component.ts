import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { PanelComponent, PanelContentDirective, PanelTitleDirective } from '@fundamental-ngx/core/panel';

@Component({
    selector: 'fd-panel-transparent-example',
    templateUrl: './panel-transparent-example.component.html',
    imports: [ButtonComponent, PanelComponent, PanelTitleDirective, PanelContentDirective, AvatarComponent, ListModule]
})
export class PanelTransparentExampleComponent {
    expanded = true;
    expanded2 = true;
}
