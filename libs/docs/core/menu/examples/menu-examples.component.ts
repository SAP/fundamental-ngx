import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-example',
    templateUrl: './menu-example.component.html',
    standalone: true,
    imports: [ButtonComponent, MenuModule]
})
export class MenuExampleComponent {}

@Component({
    selector: 'fd-menu-addon-example',
    templateUrl: './menu-addon-example.component.html',
    styleUrls: ['./menu-addon-example.component.scss'],
    standalone: true,
    imports: [ButtonComponent, MenuModule]
})
export class MenuAddonExampleComponent {}

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html',
    standalone: true,
    imports: [ButtonComponent, MenuModule, ContentDensityDirective]
})
export class MenuSeparatorExampleComponent {}
