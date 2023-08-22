import { Component } from '@angular/core';
import { ClickedBehaviorModule } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DisabledRecipientDirective } from './disabled-recipient.directive';
import { DisabledBehaviorDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fundamental-ngx-cdk-disabled-di-example',
    templateUrl: './di-example.component.html',
    styles: [
        `
            .disabled-list-example.is-disabled,
            .disabled-list-example .is-disabled {
                opacity: 0.5;
            }
        `
    ],
    standalone: true,
    imports: [DisabledBehaviorDirective, DisabledRecipientDirective, ButtonModule, ClickedBehaviorModule]
})
export class DiExampleComponent {
    rootElementDisabled = false;
    firstElementDisabled = false;

    constructor() {}
}
