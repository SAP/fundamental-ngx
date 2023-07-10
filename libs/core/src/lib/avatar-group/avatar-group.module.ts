import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarGroupComponent } from './avatar-group.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AvatarGroupComponent],
    exports: [AvatarGroupComponent]
})
export class AvatarGroupModule {}
