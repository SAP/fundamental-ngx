import { Component } from '@angular/core';
import {
    ActionBarActionsDirective,
    ActionBarComponent,
    ActionBarDescriptionDirective,
    ActionBarHeaderDirective,
    ActionBarTitleComponent
} from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-action-bar-contextual-menu-example',
    templateUrl: './action-bar-contextual-menu-example.component.html',
    imports: [
        ActionBarComponent,
        ActionBarHeaderDirective,
        ActionBarTitleComponent,
        ActionBarActionsDirective,
        ButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuTriggerDirective
    ]
})
export class ActionBarContextualMenuExampleComponent {}

@Component({
    selector: 'fd-action-bar-no-back-example',
    templateUrl: './action-bar-no-back-example.component.html',
    imports: [
        ActionBarComponent,
        ActionBarHeaderDirective,
        ActionBarTitleComponent,
        ActionBarActionsDirective,
        ActionBarDescriptionDirective,
        ButtonComponent
    ]
})
export class ActionBarNoBackExampleComponent {}
