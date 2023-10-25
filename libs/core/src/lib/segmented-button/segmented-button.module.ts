import { NgModule } from '@angular/core';

import { SegmentedButtonComponent } from './segmented-button.component';

/**
 * @deprecated
 * Use direct `SegmentedButtonComponent` import instead.
 */
@NgModule({
    imports: [SegmentedButtonComponent],
    exports: [SegmentedButtonComponent]
})
export class SegmentedButtonModule {}
