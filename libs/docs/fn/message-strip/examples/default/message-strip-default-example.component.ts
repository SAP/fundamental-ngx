import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageStripState } from '@fundamental-ngx/fn/message-strip';

export interface ExampleMessageStripItem {
    label: string;
    glyph: string;
    state: MessageStripState;
}

export const defaultItems: ExampleMessageStripItem[] = [
    {
        label: 'Information (default) Message Strip Text',
        glyph: 'message-information',
        state: 'information'
    },
    {
        label: 'Success Message Strip Text',
        glyph: 'message-success',
        state: 'success'
    },
    {
        label: 'Warning Message Strip Text',
        glyph: 'message-warning',
        state: 'warning'
    },
    {
        label: 'Error Message Strip Text',
        glyph: 'message-error',
        state: 'error'
    }
];

@Component({
    selector: 'fn-message-strip-default-example',
    templateUrl: './message-strip-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageStripDefaultExampleComponent {
    items = defaultItems;
    noIcons = false;
    dismissible = true;

    toggleDismissible(): void {
        this.dismissible = !this.dismissible;
    }

    dismiss(item): void {
        this.items = this.items.filter((i) => i !== item);
    }

    reset(): void {
        this.items = defaultItems;
    }
}
