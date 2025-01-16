import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { AvatarGroupComponent } from './avatar-group.component';
import { AvatarGroupOverflowBodyComponent } from './components/avatar-group-overflow-body/avatar-group-overflow-body.component';
import { AvatarGroupOverflowButtonComponent } from './components/avatar-group-overflow-button.component';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowBodyDirective } from './directives/avatar-group-overflow-body.directive';
import { AvatarGroupOverflowButtonDirective } from './directives/avatar-group-overflow-button.directive';

@NgModule({
    imports: [
        AvatarGroupComponent,
        AvatarGroupItemDirective,
        AvatarGroupOverflowButtonComponent,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowBodyComponent,
        AvatarGroupOverflowBodyDirective,
        PortalModule
    ],
    exports: [
        AvatarGroupComponent,
        AvatarGroupItemDirective,
        AvatarGroupOverflowButtonComponent,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowBodyComponent,
        AvatarGroupOverflowBodyDirective
    ]
})
export class AvatarGroupModule {}
