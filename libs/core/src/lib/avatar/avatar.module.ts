import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

import { AvatarComponent } from './avatar.component';

@NgModule({
    imports: [CommonModule, SkeletonModule],
    exports: [AvatarComponent],
    declarations: [AvatarComponent]
})
export class AvatarModule {}
