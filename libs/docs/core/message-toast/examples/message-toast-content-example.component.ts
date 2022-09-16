import { Component } from '@angular/core';
import { MessageToastRef } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-message-toast-content-example',
    template: `<div>
        Message Toast created from component. It will stay open if the cursor is above it. Has a customized width and
        will disappear after 7500ms
    </div>`
})
export class MessageToastContentExampleComponent {
    constructor(public ref: MessageToastRef) {}
}
