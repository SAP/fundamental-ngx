import { NgModule } from '@angular/core';
import { MessageViewComponent } from './message-view.component';

/**
 * @deprecated
 * Use direct imports of components.
 */
@NgModule({
    imports: [MessageViewComponent],
    exports: [MessageViewComponent]
})
export class PlatformMessageViewModule {}
