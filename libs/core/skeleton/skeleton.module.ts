import { NgModule } from '@angular/core';

import { SkeletonComponent } from './components/skeleton.component';

/**
 * @deprecated
 * Use direct `SkeletonComponent` import.
 */
@NgModule({
    imports: [SkeletonComponent],
    exports: [SkeletonComponent]
})
export class SkeletonModule {}
