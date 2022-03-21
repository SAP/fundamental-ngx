import { BaseToastConfig } from '../base-toast-config';

/**
 * Base configuration class used when opening a Toast which automatically destroys after some time.
 */
export class BaseToastDurationDismissibleConfig<T = any> extends BaseToastConfig<T> {
    /**
     * The length of time in milliseconds to wait before automatically dismissing the Message Toast.
     */
    duration? = 3000;
    /**
     * Whether the message toast should stay visible if the cursor is over it.
     * Default is `true`
     */
    mousePersist?: boolean = true;
}
