import { ElementRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { PlatformFormFieldControl } from '@fundamental-ngx/platform/shared';
import { MessagePopoverErrorText } from './message-popover-error.interface';

export interface MessagePopoverEntry {
    heading: MessagePopoverErrorText;
    type: FormStates;
    state: ObjectStatus;
    group?: string;
    description: MessagePopoverErrorText;
    name: string;
    fieldName: string;
    errors: ValidationErrors | null;
    element?: ElementRef;
    formField?: PlatformFormFieldControl;
}
