import { Component } from '@angular/core';
import { ActionBarActionsDirective } from '@fundamental-ngx/core/action-bar';

@Component({
    selector: 'fdp-action-button-group',
    templateUrl: './action-button-group.component.html',
    standalone: true,
    imports: [ActionBarActionsDirective]
})
export class ActionButtonGroupComponent {}
