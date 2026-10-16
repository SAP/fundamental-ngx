# Message View Component

The `fdp-message-view` component is a message display component for showing messages, notifications, or validation errors in a dialog format.

## Usage

### Basic Example

```typescript
import { Component, signal, viewChild } from '@angular/core';
import { MessageViewComponent, MessagePopoverErrorGroup } from '@fundamental-ngx/platform/message-view';

@Component({
    selector: 'app-example',
    template: `
        <fdp-message-view [messages]="messages()"> </fdp-message-view>
        <button (click)="messageView()?.open()">Show Messages</button>
    `,
    imports: [MessageViewComponent]
})
export class ExampleComponent {
    readonly messageView = viewChild(MessageViewComponent);

    messages = signal<MessagePopoverErrorGroup[]>([
        {
            group: 'Errors',
            errors: [
                {
                    type: 'error',
                    state: 'negative',
                    heading: { type: 'string', message: 'Invalid Input' },
                    description: { type: 'string', message: 'Please provide valid data.' },
                    name: 'input1',
                    fieldName: 'Input Field',
                    errors: null
                }
            ]
        },
        {
            group: 'Information',
            errors: [
                {
                    type: 'information',
                    state: 'informative',
                    heading: { type: 'string', message: 'Help Available' },
                    description: { type: 'string', message: 'Click for more details.' },
                    name: 'help1',
                    fieldName: 'Help Section',
                    errors: null
                }
            ]
        }
    ]);
}
```

## Key Differences from Message Popover

- **Display**: Opens in a dialog instead of a popover
- **API**: Uses `DialogService` internally
- **Usage**: Call `open()` and `close()` methods programmatically

## API

### Inputs

- `messages: MessagePopoverErrorGroup[]` - Direct messages to display
- `title: string` - Title for the dialog header
- `detailsTitle: string` - Title for the details view
- `mobile: boolean` - Whether the dialog should be opened in mobile mode
- `width: string` - Width of the dialog when not in mobile mode (default: `'24rem'`)
- `height: string` - Height of the dialog when not in mobile mode (default: `'auto'`)
- `resizable: boolean` - Whether the dialog should be resizable when not in mobile mode (default: `true`)

### Outputs

- `focusItem: EventEmitter<MessagePopoverEntry>` - Emits when an item should be focused

### Methods

- `open(): void` - Opens the message view dialog
- `close(): void` - Closes the message view dialog

## Import Path

```typescript
import { MessageViewComponent } from '@fundamental-ngx/platform/message-view';
```
