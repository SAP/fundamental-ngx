import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-overflow-button-text]',
    host: { class: 'fd-button__text fd-avatar-group__button-text' }
})
export class AvatarGroupOverflowButtonTextDirective {}
