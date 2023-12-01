import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-legacy-overflow-button-text]',
    host: { class: 'fd-button__text fd-avatar-group-legacy__button-text' },
    standalone: true
})
export class AvatarGroupLegacyOverflowButtonTextDirective {}
