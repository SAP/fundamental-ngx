import { FormFieldControl } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';
import { MessagePopoverErrorGroup } from './message-popover-error.interface';

export interface MessagePopoverWrapper {
    formFields: FormFieldControl[];
    errors: Observable<MessagePopoverErrorGroup[]>;
}
