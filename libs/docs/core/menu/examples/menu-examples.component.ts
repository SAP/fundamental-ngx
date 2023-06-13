import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-example',
    templateUrl: './menu-example.component.html',
    standalone: true,
    imports: [ButtonModule, MenuModule]
})
export class MenuExampleComponent {
    menuItemValue: boolean;

    valueChanged(value: boolean): void {
        this.menuItemValue = value;
    }
}

@Component({
    selector: 'fd-menu-addon-example',
    templateUrl: './menu-addon-example.component.html',
    styleUrls: ['./menu-addon-example.component.scss'],
    standalone: true,
    imports: [ButtonModule, MenuModule]
})
export class MenuAddonExampleComponent {}

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html',
    standalone: true,
    imports: [ButtonModule, MenuModule, ContentDensityDirective]
})
export class MenuSeparatorExampleComponent {}
