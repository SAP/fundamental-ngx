import { Component } from '@angular/core';

@Component({
    selector: 'fd-message-strip-custom-icon-example',
    template: `
        <fd-message-strip>
            <fd-icon *fdMessageStripIcon glyph="survey"></fd-icon>
            A dismissible normal message strip with custom icon.
        </fd-message-strip>
    `
})
export class MessageStripCustomIconExampleComponent {}
