import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonComponent } from './components/skeleton.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SkeletonComponent],
    exports: [SkeletonComponent]
})
export class SkeletonModule {}
