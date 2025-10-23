import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-profile-card-subline]',
    host: {
        class: 'fd-settings__profile-card-subline'
    },
    standalone: true
})
export class SettingsProfileCardSublineDirective {}
