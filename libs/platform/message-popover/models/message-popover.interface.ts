import { EventEmitter } from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { MessagePopoverEntry } from './message-popover-entry.interface';

export type MessagePopoverState =
    | Omit<ObjectStatus, 'informative' | 'neutral' | 'positive'>
    | 'information'
    | 'success'
    | 'neutral';

export interface MessagePopover {
    focusItem: EventEmitter<MessagePopoverEntry>;
}
