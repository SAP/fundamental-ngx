import { PlatformFormFieldControl } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';
import { MessagePopoverErrorGroup } from './message-popover-entry.interface';
import { MessagePopover } from './message-popover.interface';

export interface MessagePopoverWrapper {
    formFields: PlatformFormFieldControl[];
    errors: Observable<MessagePopoverErrorGroup[]>;
    setMessagePopover: (messagePopover: MessagePopover) => void;
}
