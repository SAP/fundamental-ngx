import { NgModule } from '@angular/core';
import { TextComponent } from './text.component';

/**
 * @deprecated Use the standalone `TextComponent` directly instead. Import `TextComponent` in your component's imports array.
 * This module will be removed in a future version.
 */
@NgModule({
    imports: [TextComponent],
    exports: [TextComponent]
})
export class TextModule {}
