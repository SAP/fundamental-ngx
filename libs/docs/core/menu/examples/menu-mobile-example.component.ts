import { Component } from '@angular/core';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-menu-mobile-example',
    templateUrl: './menu-mobile-example.component.html',
    standalone: true,
    imports: [ButtonModule, MenuModule]
})
export class MenuMobileExampleComponent {}
