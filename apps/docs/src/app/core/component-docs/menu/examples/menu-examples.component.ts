import { Component } from '@angular/core';

@Component({
    selector: 'fd-menu-example',
    templateUrl: './menu-example.component.html'
})
export class MenuExampleComponent {}

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html'
})
export class MenuSeparatorExampleComponent {}

@Component({
    selector: 'fd-menu-mobile-example',
    templateUrl: './menu-mobile-example.component.html'
})
export class MenuMobileExampleComponent {
    isOpen: boolean = false;
}

@Component({
    selector: 'fd-menu-with-submenu-example',
    templateUrl: './menu-with-submenu-example.component.html'
})
export class MenuWithSubmenuExampleComponent {}
