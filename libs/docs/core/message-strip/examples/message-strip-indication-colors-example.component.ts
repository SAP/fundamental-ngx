import { NgFor } from '@angular/common';
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
    ],
    standalone: true,
    imports: [NgFor, MessageStripComponent, MessageStripIconDirective, IconComponent]
})
export class MessageStripIndicationColorsExampleComponent {
    indicationColors = _messageStripIndicationColors;
}
