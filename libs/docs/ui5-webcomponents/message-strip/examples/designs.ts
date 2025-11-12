import { Component, signal } from '@angular/core';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';
import { MessageStripDesign } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-message-strip-designs-sample',
    templateUrl: './designs.html',
    standalone: true,
    imports: [MessageStrip]
})
export class MessageStripDesignsSample {
    design = signal(MessageStripDesign);
}
