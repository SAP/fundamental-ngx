import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-dialog-content]',
    host: {
        class: 'fd-settings__dialog-content'
    },
    standalone: true
})
export class SettingsDialogContentDirective {}
