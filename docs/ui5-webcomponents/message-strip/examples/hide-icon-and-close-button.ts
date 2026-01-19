import { Component } from '@angular/core';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-message-strip-hide-icon-and-close-button-sample',
    templateUrl: './hide-icon-and-close-button.html',
    standalone: true,
    imports: [MessageStrip]
})
export class MessageStripHideIconAndCloseButtonSample {}
