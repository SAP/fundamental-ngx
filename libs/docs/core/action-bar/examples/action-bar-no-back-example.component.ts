import { Component } from '@angular/core';
import {
    ActionBarActionsDirective,
    ActionBarComponent,
    ActionBarDescriptionDirective,
    ActionBarHeaderDirective,
    ActionBarTitleComponent
} from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';

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
