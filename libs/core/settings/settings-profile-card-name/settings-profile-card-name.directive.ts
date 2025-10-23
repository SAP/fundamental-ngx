import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-profile-card-name]',
    host: {
        class: 'fd-settings__profile-card-name'
    },
    standalone: true
})
export class SettingsProfileCardNameDirective {}
