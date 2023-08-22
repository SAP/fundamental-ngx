import { Component } from '@angular/core';
import { _messageStripIndicationColors } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'fd-message-strip-indication-colors-example',
    template: `
        <fd-message-strip [indicationColor]="indicationColor" *ngFor="let indicationColor of indicationColors">
            <fd-icon *fdMessageStripIcon glyph="sys-enter-2"></fd-icon>
            This is the message strip with indication color "{{ indicationColor }}"
        </fd-message-strip>
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        `
    ]
})
export class MessageStripIndicationColorsExampleComponent {
    indicationColors = _messageStripIndicationColors;
}
