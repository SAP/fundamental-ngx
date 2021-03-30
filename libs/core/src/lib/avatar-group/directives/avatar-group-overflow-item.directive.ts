import { Directive } from '@angular/core';

import { AvatarGroupItemDirective } from './avatar-group-item.directive';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-overflow-item]'
})
export class AvatarGroupOverflowItemDirective extends AvatarGroupItemDirective {}
