import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-list-container]',
    host: {
        class: 'fd-settings__list-container'
    },
    standalone: true
})
export class SettingsListContainerDirective {}
