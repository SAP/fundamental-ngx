import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-illustrated-message-actions',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-illustrated-message__actions'
    }
})
export class IllustratedMessageActionsComponent {}
