import { Component } from '@angular/core';
import { warnOnce } from '@fundamental-ngx/cdk/utils';
import { ActionBarActionsDirective } from '@fundamental-ngx/core/action-bar';

/**
 * @deprecated
 * ActionButtonGroupComponent is deprecated
 */
@Component({
    selector: 'fdp-action-button-group',
    templateUrl: './action-button-group.component.html',
    standalone: true,
    imports: [ActionBarActionsDirective]
})
export class ActionButtonGroupComponent {
    /** @hidden */
    constructor() {
        warnOnce(`ActionButtonGroupComponent is deprecated and will be removed in future release.`);
    }
}
