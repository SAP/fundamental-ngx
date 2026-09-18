import { Signal } from '@angular/core';
import { PlatformFormFieldControl } from '@fundamental-ngx/platform/shared';
import { MessagePopoverErrorGroup } from './message-popover-entry.interface';
import { MessagePopover } from './message-popover.interface';

export interface MessagePopoverWrapper {
    formFields: PlatformFormFieldControl[];
    errors$: Signal<MessagePopoverErrorGroup[]>;
    setMessagePopover: (messagePopover: MessagePopover) => void;
}
