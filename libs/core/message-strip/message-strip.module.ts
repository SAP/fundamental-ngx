import { NgModule } from '@angular/core';

import { AutoDismissMessageStripDirective } from './auto-dismiss-message-strip.directive';
import { MessageStripIconDirective } from './message-strip-icon.directive';
import { MessageStripComponent } from './message-strip.component';

@NgModule({
    imports: [MessageStripComponent, AutoDismissMessageStripDirective, MessageStripIconDirective],
    exports: [MessageStripComponent, AutoDismissMessageStripDirective, MessageStripIconDirective]
})
export class MessageStripModule {}
