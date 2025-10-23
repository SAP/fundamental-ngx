import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-profile-card]',
    host: {
        class: 'fd-settings__profile-card'
    },
    standalone: true
})
export class SettingsProfileCardDirective {}
