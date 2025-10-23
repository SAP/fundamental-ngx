import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-content-container]',
    host: {
        class: 'fd-settings__content-container'
    },
    standalone: true
})
export class SettingsContentContainerDirective {}
