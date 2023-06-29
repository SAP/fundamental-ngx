import { EventEmitter } from '@angular/core';
import { MessagePopoverEntry } from './message-popover-entry.interface';

export interface MessagePopover {
    focusItem: EventEmitter<MessagePopoverEntry>;
}
