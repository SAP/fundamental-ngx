import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-example',
    templateUrl: './menu-example.component.html',
    imports: [ButtonComponent, MenuModule]
})
export class MenuExampleComponent {}

@Component({
    selector: 'fd-menu-addon-example',
    templateUrl: './menu-addon-example.component.html',
    styleUrls: ['./menu-addon-example.component.scss'],
    imports: [ButtonComponent, MenuModule]
})
export class MenuAddonExampleComponent {}

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html',
    imports: [ButtonComponent, MenuModule]
})
export class MenuSeparatorExampleComponent {}
