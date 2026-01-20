import { NgModule } from '@angular/core';
import { TitleComponent } from './title.component';

/**
 * @deprecated Use the standalone `TitleComponent` directly instead. Import `TitleComponent` in your component's imports array.
 * This module will be removed in a future version.
 */
@NgModule({
    imports: [TitleComponent],
    exports: [TitleComponent]
})
export class TitleModule {}
