import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MESSAGE_TOAST_DATA, MessageToastConfig, MessageToastService } from '@fundamental-ngx/fn/message-toast';

export interface MessageToastExampleData {
    message: string;
    icon: string;
}

@Component({
    selector: 'fn-message-toast-component-example',
    template: `<fd-icon [glyph]="data.icon"></fd-icon> {{ data.message }}`,
    styles: [
        `
            fd-icon[class*='sap-icon'] {
                color: currentColor;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastComponentExampleComponent {
    constructor(@Inject(MESSAGE_TOAST_DATA) public data: MessageToastExampleData) {}
}

@Component({
    selector: 'fundamental-ngx-message-toast-default-example',
    templateUrl: './message-toast-default-example.component.html',
    styles: [
        `
            .fn-message-toast-example-control-buttons .fn-button {
                margin: 1rem;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastDefaultExampleComponent {
    refs: { [key: number]: any } = {};

    constructor(private _messageToastService: MessageToastService) {}

    open(id: number): void {
        this.refs[id] = this._messageToastService.open(id.toString());
    }

    close(id: number): void {
        this.refs[id].dismiss();
    }

    openFromString(): void {
        this._messageToastService.open('Message Toast created from string.');
    }

    openFromComponent(): void {
        const config: MessageToastConfig<MessageToastExampleData> = {
            duration: 0,
            data: {
                message: 'Message Toast created from component.',
                icon: 'status-positive'
            }
        };

        this._messageToastService.openFromComponent(MessageToastComponentExampleComponent, config);
    }

    openFromTemplate(template): void {
        this._messageToastService.openFromTemplate(template, {
            maxWidth: 200,
            truncate: true,
            data: {
                // eslint-disable-next-line max-len
                message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
        });
    }

    dismissAll(): void {
        this._messageToastService.dismissAll();
    }
}
