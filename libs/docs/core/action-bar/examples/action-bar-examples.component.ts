import { Component } from '@angular/core';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-action-bar-contextual-menu-example',
    templateUrl: './action-bar-contextual-menu-example.component.html',
    imports: [ActionBarModule, ButtonComponent, MenuModule]
})
export class ActionBarContextualMenuExampleComponent {}

@Component({
    selector: 'fd-action-bar-no-back-example',
    templateUrl: './action-bar-no-back-example.component.html',
    imports: [ActionBarModule, ButtonComponent]
})
export class ActionBarNoBackExampleComponent {}
