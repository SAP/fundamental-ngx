import { BaseToastDurationDismissibleConfig } from '@fundamental-ngx/cdk/utils';

/**
 * Configuration used when opening a Message Toast.
 */
export class MessageToastConfig<T = any> extends BaseToastDurationDismissibleConfig<T> {
    /** Whether the Message Toast should be animated. */
    animated? = false;
}
