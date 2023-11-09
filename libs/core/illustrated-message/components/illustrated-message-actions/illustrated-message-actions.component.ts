import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-illustrated-message-actions',
    host: {
        class: 'fd-illustrated-message__actions'
    },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class IllustratedMessageActionsComponent {}
