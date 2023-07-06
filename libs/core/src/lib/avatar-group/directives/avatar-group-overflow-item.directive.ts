import { Directive } from '@angular/core';

import { AvatarGroupItemDirective } from './avatar-group-item.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-overflow-item]',
    standalone: true
})
export class AvatarGroupOverflowItemDirective extends AvatarGroupItemDirective {}
