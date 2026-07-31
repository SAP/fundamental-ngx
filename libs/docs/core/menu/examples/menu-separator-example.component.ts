import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html',
    imports: [ButtonComponent, MenuModule]
})
export class MenuSeparatorExampleComponent {}
