import { NgModule } from '@angular/core';

import { MessageStripComponent } from './message-strip.component';
import { AutoDismissMessageStripDirective } from './auto-dismiss-message-strip.directive';
import { MessageStripIconDirective } from './message-strip-icon.directive';

@NgModule({
    imports: [MessageStripComponent, AutoDismissMessageStripDirective, MessageStripIconDirective],
    exports: [MessageStripComponent, AutoDismissMessageStripDirective, MessageStripIconDirective]
})
export class MessageStripModule {}
