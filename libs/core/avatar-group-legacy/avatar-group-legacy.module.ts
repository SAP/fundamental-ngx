import { NgModule } from '@angular/core';

import { AvatarGroupLegacyComponent } from './avatar-group-legacy.component';
import { AvatarGroupLegacyFocusableAvatarDirective } from './directives/avatar-group-legacy-focusable-avatar.directive';
import { AvatarGroupLegacyItemDirective } from './directives/avatar-group-legacy-item.directive';
import { AvatarGroupLegacyOverflowBodyDirective } from './directives/avatar-group-legacy-overflow-body.directive';
import { AvatarGroupLegacyOverflowButtonTextDirective } from './directives/avatar-group-legacy-overflow-button-text.directive';
import { AvatarGroupLegacyOverflowButtonDirective } from './directives/avatar-group-legacy-overflow-button.directive';
import { AvatarGroupLegacyOverflowItemDirective } from './directives/avatar-group-legacy-overflow-item.directive';
import { AvatarGroupLegacyPopoverControlDirective } from './directives/avatar-group-legacy-popover-control.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        AvatarGroupLegacyComponent,
        AvatarGroupLegacyItemDirective,
        AvatarGroupLegacyFocusableAvatarDirective,
        AvatarGroupLegacyPopoverControlDirective,
        AvatarGroupLegacyOverflowBodyDirective,
        AvatarGroupLegacyOverflowItemDirective,
        AvatarGroupLegacyOverflowButtonDirective,
        AvatarGroupLegacyOverflowButtonTextDirective
    ],
    exports: [
        AvatarGroupLegacyComponent,
        AvatarGroupLegacyItemDirective,
        AvatarGroupLegacyFocusableAvatarDirective,
        AvatarGroupLegacyPopoverControlDirective,
        AvatarGroupLegacyOverflowBodyDirective,
        AvatarGroupLegacyOverflowItemDirective,
        AvatarGroupLegacyOverflowButtonDirective,
        AvatarGroupLegacyOverflowButtonTextDirective
    ]
})
export class AvatarGroupLegacyModule {}
