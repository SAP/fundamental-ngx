import { TemplateRef } from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { MessagePopoverEntry } from './message-popover-entry.interface';

export interface MessagePopoverError {
    group: FormStates | 'all';
    state: ObjectStatus;
    count: number;
}

export interface MessagePopoverErrorText {
    message?: TemplateRef<any> | string | null;
    type: 'templateRef' | 'directive' | 'string';
    error?: any;
}

export interface MessagePopoverErrorGroup {
    group?: string;
    errors: MessagePopoverEntry[];
}
