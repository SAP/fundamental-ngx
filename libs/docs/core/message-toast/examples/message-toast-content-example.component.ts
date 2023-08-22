import { Component } from '@angular/core';
import { MessageToastRef } from '@fundamental-ngx/core/message-toast';

interface ComponentData {
    content: string;
}

@Component({
    selector: 'fd-message-toast-content-example',
    template: `<div>
        {{ ref.data.content }}
    </div>`,
    standalone: true
})
export class MessageToastContentExampleComponent {
    constructor(public ref: MessageToastRef<ComponentData>) {
        console.log(this.ref);
    }
}
