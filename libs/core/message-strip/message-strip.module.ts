import { NgModule } from '@angular/core';

import { AutoDismissMessageStripDirective } from './auto-dismiss-message-strip.directive';
import { MessageStripIconDirective } from './message-strip-icon.directive';
import { MessageStripComponent } from './message-strip.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [MessageStripComponent, AutoDismissMessageStripDirective, MessageStripIconDirective],
    exports: [MessageStripComponent, AutoDismissMessageStripDirective, MessageStripIconDirective]
})
export class MessageStripModule {}
