import { Directive } from '@angular/core';

import { AvatarGroupLegacyItemDirective } from './avatar-group-legacy-item.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-legacy-overflow-item]',
    standalone: true
})
export class AvatarGroupLegacyOverflowItemDirective extends AvatarGroupLegacyItemDirective {}
