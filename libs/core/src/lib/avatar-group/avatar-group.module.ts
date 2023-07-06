import { NgModule } from '@angular/core';

import { AvatarGroupComponent } from './avatar-group.component';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowBodyDirective } from './directives/avatar-group-overflow-body.directive';
import { AvatarGroupOverflowItemDirective } from './directives/avatar-group-overflow-item.directive';
import { AvatarGroupOverflowButtonDirective } from './directives/avatar-group-overflow-button.directive';
import { AvatarGroupOverflowButtonTextDirective } from './directives/avatar-group-overflow-button-text.directive';
import { AvatarGroupFocusableAvatarDirective } from './directives/avatar-group-focusable-avatar.directive';
import { AvatarGroupPopoverControlDirective } from './directives/avatar-group-popover-control.directive';

@NgModule({
    imports: [
        AvatarGroupComponent,
        AvatarGroupItemDirective,
        AvatarGroupFocusableAvatarDirective,
        AvatarGroupPopoverControlDirective,
        AvatarGroupOverflowBodyDirective,
        AvatarGroupOverflowItemDirective,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowButtonTextDirective
    ],
    exports: [
        AvatarGroupComponent,
        AvatarGroupItemDirective,
        AvatarGroupFocusableAvatarDirective,
        AvatarGroupPopoverControlDirective,
        AvatarGroupOverflowBodyDirective,
        AvatarGroupOverflowItemDirective,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowButtonTextDirective
    ]
})
export class AvatarGroupModule {}
