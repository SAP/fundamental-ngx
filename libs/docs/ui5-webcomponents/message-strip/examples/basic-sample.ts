import { Component } from '@angular/core';
import { MessageStrip } from '@fundamental-ngx/ui5-webcomponents/message-strip';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-message-strip-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [MessageStrip]
})
export class MessageStripBasicSample {}
