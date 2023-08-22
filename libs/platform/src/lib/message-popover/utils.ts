import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { FormStates } from '@fundamental-ngx/cdk/forms';
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
