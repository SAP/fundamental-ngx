import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-illustrated-message-actions',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-illustrated-message__actions'
    },
    standalone: true
})
export class IllustratedMessageActionsComponent {}
