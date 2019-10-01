import { Component } from '@angular/core';

@Component({
    selector: 'fd-mega-menu-example',
    templateUrl: './mega-menu-example.component.html'
})
export class MegaMenuExampleComponent {}

@Component({
    selector: 'fd-mega-menu-group-example',
    templateUrl: './mega-menu-group-example.component.html'
})
export class MegaMenuGroupExampleComponent {}


@Component({
    selector: 'fd-mega-menu-position-example',
    templateUrl: './mega-menu-position-example.component.html',
    styles: [`
        .mega-menu-right-position {
            display: flex;
            justify-content: flex-end;
        }
    `]
})
export class MegaMenuPositionExampleComponent {}
