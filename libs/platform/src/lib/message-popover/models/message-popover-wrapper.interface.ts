import { PlatformFormFieldControl } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';
import { MessagePopoverComponent } from '../message-popover.component';
import { MessagePopoverErrorGroup } from './message-popover-error.interface';

export interface MessagePopoverWrapper {
    formFields: PlatformFormFieldControl[];
    errors: Observable<MessagePopoverErrorGroup[]>;
    setMessagePopover: (messagePopover: MessagePopoverComponent) => void;
}
