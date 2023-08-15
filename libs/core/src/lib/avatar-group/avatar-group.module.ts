import { NgModule } from '@angular/core';
import { AvatarGroupComponent } from './avatar-group.component';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowButtonComponent } from './components/avatar-group-overflow-button.component';

@NgModule({
    imports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarGroupOverflowButtonComponent],
    exports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarGroupOverflowButtonComponent]
})
export class AvatarGroupModule {}
