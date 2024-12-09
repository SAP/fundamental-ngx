import { Component } from '@angular/core';
import { ClickedDirective, DisabledBehaviorDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DisabledRecipientDirective } from './disabled-recipient.directive';

@Component({
    selector: 'fdk-disabled-di-example',
    templateUrl: './di-example.component.html',
    styles: [
        `
            .disabled-list-example.is-disabled,
            .disabled-list-example .is-disabled {
                opacity: 0.5;
            }
        `
    ],
    imports: [DisabledBehaviorDirective, DisabledRecipientDirective, ButtonComponent, ClickedDirective]
})
export class DiExampleComponent {
    rootElementDisabled = false;
    firstElementDisabled = false;

    constructor() {}
}
