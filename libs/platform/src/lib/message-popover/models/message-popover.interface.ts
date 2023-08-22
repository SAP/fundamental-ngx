import { EventEmitter } from '@angular/core';
import { MessagePopoverEntry } from './message-popover-entry.interface';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';

export type MessagePopoverState =
    | Omit<ObjectStatus, 'informative' | 'neutral' | 'positive'>
    | 'information'
    | 'success'
    | 'neutral';

export interface MessagePopover {
    focusItem: EventEmitter<MessagePopoverEntry>;
}
