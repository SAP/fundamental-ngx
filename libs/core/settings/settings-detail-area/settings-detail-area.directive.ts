import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-settings-detail-area]',
    host: {
        class: 'fd-settings__detail-area'
    },
    standalone: true
})
export class SettingsDetailAreaDirective {}
