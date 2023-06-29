import { ElementRef, TemplateRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { PlatformFormFieldControl } from '@fundamental-ngx/platform/shared';

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
