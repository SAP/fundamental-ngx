import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { MessagePopoverState } from './models/message-popover.interface';

/**
 * Converts Object Status into Message Popover State
 * @param status Object status
 * @returns Message Popover State.
 */
export function convertFormStateToMessagePopoverState(state: FormStates): MessagePopoverState {
    switch (state) {
        case 'error':
            return 'negative';
        case 'warning':
            return 'critical';
        case 'default':
            return 'neutral';
        default:
            return state;
    }
}

/**
 * Converts Form State into Object status type.
 * @param type Form state.
 * @returns `ObjectStatus` type.
 */
export function convertFormState(type: FormStates): ObjectStatus {
    switch (type) {
        case 'success':
            return 'positive';
        case 'error':
            return 'negative';
        case 'warning':
            return 'critical';
        case 'information':
            return 'informative';
        default:
            return 'neutral';
    }
}

/**
 * Maps message type to icon name.
 * @param type Message type (error, success, warning, information, default).
 * @returns Icon name for the given message type.
 */
export function getIconForMessageType(type: string): string {
    switch (type) {
        case 'error':
            return 'error';
        case 'success':
            return 'sys-enter-2';
        case 'warning':
            return 'alert';
        case 'information':
            return 'information';
        default:
            return 'sys-help-2';
    }
}
