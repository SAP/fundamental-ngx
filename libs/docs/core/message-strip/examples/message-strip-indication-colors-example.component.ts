import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    MessageStripComponent,
    MessageStripIconDirective,
    _messageStripIndicationColors
} from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'fd-message-strip-indication-colors-example',
    template: `
        @for (indicationColor of indicationColors; track indicationColor) {
            <fd-message-strip [indicationColor]="indicationColor">
                <fd-icon *fdMessageStripIcon glyph="sys-enter-2"></fd-icon>
                This is the message strip with indication color "{{ indicationColor }}"
            </fd-message-strip>
        }
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        `
    ],
    imports: [MessageStripComponent, MessageStripIconDirective, IconComponent]
})
export class MessageStripIndicationColorsExampleComponent {
    indicationColors = _messageStripIndicationColors;
}
