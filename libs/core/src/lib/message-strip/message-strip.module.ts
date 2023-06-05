import { NgModule } from '@angular/core';

import { MessageStripComponent } from './message-strip.component';
import { AutoDismissMessageStripDirective } from './auto-dismiss-message-strip.directive';

@NgModule({
    imports: [MessageStripComponent, AutoDismissMessageStripDirective],
    exports: [MessageStripComponent, AutoDismissMessageStripDirective]
})
export class MessageStripModule {}
