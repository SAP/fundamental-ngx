import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-overflow-body]',
    host: { class: 'fd-avatar-group__overflow-body' }
})
export class AvatarGroupOverflowBodyDirective {}
