import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-overflow-button-text]',
    host: { class: 'fd-button__text fd-avatar-group__button-text' },
    standalone: true
})
export class AvatarGroupOverflowButtonTextDirective {}
