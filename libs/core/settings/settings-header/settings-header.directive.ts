import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-header]',
    host: {
        class: 'fd-settings__header'
    },
    standalone: true
})
export class SettingsHeaderDirective {}
