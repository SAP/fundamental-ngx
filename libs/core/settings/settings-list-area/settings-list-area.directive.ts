import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-list-area]',
    host: {
        class: 'fd-settings__list-area'
    },
    standalone: true
})
export class SettingsListAreaDirective {}
