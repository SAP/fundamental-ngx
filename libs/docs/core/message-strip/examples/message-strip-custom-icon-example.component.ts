import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { MessageStripComponent, MessageStripIconDirective } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'fd-message-strip-custom-icon-example',
    template: `
        <fd-message-strip>
            <fd-icon *fdMessageStripIcon glyph="survey"></fd-icon>
            A dismissible normal message strip with custom icon.
        </fd-message-strip>
    `,
    standalone: true,
    imports: [MessageStripComponent, MessageStripIconDirective, IconModule]
})
export class MessageStripCustomIconExampleComponent {}
