import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-dialog-body]',
    host: {
        class: 'fd-settings__dialog-body'
    },
    standalone: true
})
export class SettingsDialogBodyDirective {}
