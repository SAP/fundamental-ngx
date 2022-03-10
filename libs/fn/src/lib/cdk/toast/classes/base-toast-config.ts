import { BaseToastPosition, ToastBottomCenterPosition } from '../base-toast-positions';

/**
 * Base Configuration class used when opening a Toast.
 */
export class BaseToastConfig<T = any> {
    /**
     * Data being injected into the child component.
     */
    data?: T;

    /**
     * Aria-label for the message toast component element.
     */
    ariaLabel?: string;

    /**
     * Toast position strategy.
     */
    positionStategy?: BaseToastPosition = ToastBottomCenterPosition;

    /**
     * Toast minimum width.
     */
    minWidth?: number | string;

    /**
     * Toast maximum width.
     */
    maxWidth?: number | string;

    /**
     * Toast minimum height.
     */
    minHeight?: number | string;

    /**
     * Toast maximum height.
     */
    maxHeight?: number | string;

    /**
     * Toast width.
     */
    width?: number | string;

    /**
     * Toast height.
     */
    height?: number | string;
}

/**
 * Base configuration class used when opening a Toast which automatically destroys after some time.
 */
export class BaseDurationDismissibleToastConfig<T = any> extends BaseToastConfig<T> {
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
