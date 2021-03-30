import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarGroupComponent } from './avatar-group.component';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowBodyDirective } from './directives/avatar-group-overflow-body.directive';
import { AvatarGroupOverflowItemDirective } from './directives/avatar-group-overflow-item.directive';
import { AvatarGroupOverflowButtonDirective } from './directives/avatar-group-overflow-button.directive';
import { AvatarGroupOverflowButtonTextDirective } from './directives/avatar-group-overflow-button-text.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        AvatarGroupComponent,
        AvatarGroupItemDirective,
        AvatarGroupOverflowBodyDirective,
        AvatarGroupOverflowItemDirective,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowButtonTextDirective
    ],
    declarations: [
        AvatarGroupComponent,
        AvatarGroupItemDirective,
        AvatarGroupOverflowBodyDirective,
        AvatarGroupOverflowItemDirective,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowButtonTextDirective
    ]
})
export class AvatarGroupModule {}
