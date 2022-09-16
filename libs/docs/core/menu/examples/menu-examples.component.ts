import { Component } from '@angular/core';

@Component({
    selector: 'fd-menu-example',
    templateUrl: './menu-example.component.html'
})
export class MenuExampleComponent {}

@Component({
    selector: 'fd-menu-addon-example',
    templateUrl: './menu-addon-example.component.html',
    styleUrls: ['./menu-addon-example.component.scss']
})
export class MenuAddonExampleComponent {}

@Component({
    selector: 'fd-menu-separator-example',
    templateUrl: './menu-separator-example.component.html'
})
export class MenuSeparatorExampleComponent {}
