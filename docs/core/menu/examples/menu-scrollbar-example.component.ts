import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-scrollbar-example',
    templateUrl: './menu-scrollbar-example.component.html',
    imports: [ButtonComponent, MenuModule]
})
export class MenuScrollbarExampleComponent {
    /** Generate 40 options for scrollbar demonstration */
    options = Array.from({ length: 40 }, () => 'Option');
}
