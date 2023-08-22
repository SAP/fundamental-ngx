import { Component } from '@angular/core';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';

@Component({
    selector: 'fd-action-bar-contextual-menu-example',
    templateUrl: './action-bar-contextual-menu-example.component.html',
    standalone: true,
    imports: [ActionBarModule, ButtonModule, MenuModule]
})
export class ActionBarContextualMenuExampleComponent {}

@Component({
    selector: 'fd-action-bar-no-back-example',
    templateUrl: './action-bar-no-back-example.component.html',
    standalone: true,
    imports: [ActionBarModule, ButtonModule]
})
export class ActionBarNoBackExampleComponent {}
