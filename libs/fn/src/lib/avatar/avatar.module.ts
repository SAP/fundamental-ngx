import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';

@NgModule({
    imports: [CommonModule],
    exports: [AvatarComponent],
    declarations: [AvatarComponent]
})
export class AvatarModule {}
