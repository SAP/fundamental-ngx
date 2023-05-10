import { ConnectedPosition } from '@angular/cdk/overlay';

export interface ToastGlobalPosition {
    left?: string;
    right?: string;
    bottom?: string;
    top?: string;
    center: boolean;
    centerVertically?: boolean;
}

export const toastConnectedTopPosition: ConnectedPosition = {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 16
};

export const toastConnectedTopLeftPosition: ConnectedPosition = {
    ...toastConnectedTopPosition,
    ...{ overlayX: 'start', originX: 'start' }
};

export const toastConnectedTopRightPosition: ConnectedPosition = {
    ...toastConnectedTopPosition,
    ...{ overlayX: 'end', originX: 'end' }
};

export const toastConnectedBottomPosition: ConnectedPosition = {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -16
};

export const toastConnectedBottomLeftPosition: ConnectedPosition = {
    ...toastConnectedBottomPosition,
    ...{ overlayX: 'start', originX: 'start' }
};

export const toastConnectedBottomRightPosition: ConnectedPosition = {
    ...toastConnectedBottomPosition,
    ...{ overlayX: 'end', originX: 'end' }
};

/**
 * Base Toast Position class.
 */
export abstract class BaseToastPosition {
    /**
     * Position strategy of the first item.
     */
    global!: ToastGlobalPosition;
    /**
     * Position strategy of the newly added items.
     */
    connected!: ConnectedPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the top-center of the screen.
 * New items will stack after the first item.
 */
export class ToastTopCenterPosition extends BaseToastPosition {
    /** @hidden */
    static global: ToastGlobalPosition = {
        top: '1rem',
        center: true
    };
    /** @hidden */
    static connected: ConnectedPosition = toastConnectedTopPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the bottom-center of the screen.
 * New items will stack before first item.
 */
export class ToastBottomCenterPosition extends BaseToastPosition {
    /** @hidden */
    static global: ToastGlobalPosition = {
        bottom: '1rem',
        center: true
    };
    /** @hidden */
    static connected: ConnectedPosition = toastConnectedBottomPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the top-left of the screen.
 * New items will stack after first item.
 */
export class ToastTopLeftPosition extends ToastTopCenterPosition {
    /** @hidden */
    static override global = { ...ToastTopCenterPosition.global, ...{ left: '1rem', center: false } };
    /** @hidden */
    static override connected: ConnectedPosition = toastConnectedTopLeftPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the top-right of the screen.
 * New items will stack after first item.
 */
export class ToastTopRightPosition extends ToastTopCenterPosition {
    /** @hidden */
    static override global = { ...ToastTopCenterPosition.global, ...{ right: '1rem', center: false } };
    /** @hidden */
    static override connected: ConnectedPosition = toastConnectedTopRightPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the bottom-left of the screen.
 * New items will stack before first item.
 */
export class ToastBottomLeftPosition extends ToastBottomCenterPosition {
    /** @hidden */
    static override global = { ...ToastBottomCenterPosition.global, ...{ left: '1rem', center: false } };
    /** @hidden */
    static override connected = toastConnectedBottomLeftPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the bottom-right of the screen.
 * New items will stack before first item.
 */
export class ToastBottomRightPosition extends ToastBottomCenterPosition {
    /** @hidden */
    static override global = { ...ToastBottomCenterPosition.global, ...{ right: '1rem', center: false } };
    /** @hidden */
    static override connected = toastConnectedBottomRightPosition;
}
