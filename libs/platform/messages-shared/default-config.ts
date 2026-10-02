import { InjectionToken } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';

export interface MessagePopoverErrorConfig {
    heading: string;
    description?: string;
    type: FormStates;
}

export interface MessagePopoverConfig {
    /**
     * Errors object where key is error type and value is i18n string.
     */
    errors: Record<string, string | MessagePopoverErrorConfig>;
}

export const FDP_MESSAGE_POPOVER_DEFAULT_CONFIG: MessagePopoverConfig = {
    errors: {
        email: 'platformMessagePopover.defaultErrors.email',
        max: 'platformMessagePopover.defaultErrors.max',
        maxlength: 'platformMessagePopover.defaultErrors.maxLength',
        min: 'platformMessagePopover.defaultErrors.min',
        minlength: 'platformMessagePopover.defaultErrors.minLength',
        pattern: 'platformMessagePopover.defaultErrors.pattern',
        required: 'platformMessagePopover.defaultErrors.required',
        requiredTrue: 'platformMessagePopover.defaultErrors.requiredTrue'
    }
};

export const FDP_MESSAGE_POPOVER_CONFIG = new InjectionToken<MessagePopoverConfig>('FdpMessagePopoverConfig');
