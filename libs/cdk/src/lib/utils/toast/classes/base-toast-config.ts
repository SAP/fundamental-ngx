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
    positionStrategy?: BaseToastPosition = ToastBottomCenterPosition;

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

    /**
     * Toast ID.
     */
    id?: string;
}

/**
 * Base Configuration class used when opening an animated Toast.
 */
export class BaseAnimatedToastConfig<T = any> extends BaseToastConfig<T> {
    /** Whether the toast should be animated. */
    animated? = true;
}
