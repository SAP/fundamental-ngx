import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { FormStates } from '@fundamental-ngx/core/shared';

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
