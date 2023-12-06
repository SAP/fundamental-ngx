import { FormStates } from '@fundamental-ngx/cdk/forms';

export const CSS_CLASS_NAME = {
    message: 'fd-form-message',
    messageStatic: 'fd-form-message--static',
    messageEmbedded: 'fd-form-message--embedded',
    messageSuccess: 'fd-form-message--success',
    messageError: 'fd-form-message--error',
    messageWarning: 'fd-form-message--warning',
    messageInformation: 'fd-form-message--information'
};

/** Get form message CSS class accordingly to its type */
export function getTypeClassName(size: FormStates): string | null {
    switch (size) {
        case 'error':
            return CSS_CLASS_NAME.messageError;
        case 'success':
            return CSS_CLASS_NAME.messageSuccess;
        case 'warning':
            return CSS_CLASS_NAME.messageWarning;
        case 'information':
            return CSS_CLASS_NAME.messageInformation;
        default:
            return null;
    }
}
