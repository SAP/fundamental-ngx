import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Component representing the actions section of an illustrated message.
 * Typically contains buttons or links for user actions.
 */
@Component({
    selector: 'fd-illustrated-message-actions',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-illustrated-message__actions'
    }
})
export class IllustratedMessageActionsComponent {}
