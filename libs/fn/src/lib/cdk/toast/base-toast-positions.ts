import { ConnectedPosition } from '@angular/cdk/overlay';

export interface ToastGlobalPosition {
    left?: string;
    right?: string;
    bottom?: string;
    top?: string;
    center: boolean;
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
    global!: ToastGlobalPosition;
    connected!: ConnectedPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the top-center of the screen.
 * New items will stack bellow first item.
 */
export class ToastTopCenterPosition extends BaseToastPosition {
    static global: ToastGlobalPosition = {
        top: '1rem',
        center: true
    };

    static connected: ConnectedPosition = toastConnectedTopPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the bottom-center of the screen.
 * New items will stack above first item.
 */
export class ToastBottomCenterPosition extends BaseToastPosition {
    static global: ToastGlobalPosition = {
        bottom: '1rem',
        center: true
    };

    static connected: ConnectedPosition = toastConnectedBottomPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the top-left of the screen.
 * New items will stack below first item.
 */
export class ToastTopLeftPosition extends ToastTopCenterPosition {
    static global = { ...ToastTopCenterPosition.global, ...{ left: '1rem', center: false } };
    static connected: ConnectedPosition = toastConnectedTopLeftPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the top-right of the screen.
 * New items will stack below first item.
 */
export class ToastTopRightPosition extends ToastTopCenterPosition {
    static global = { ...ToastTopCenterPosition.global, ...{ right: '1rem', center: false } };
    static connected: ConnectedPosition = toastConnectedTopRightPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the bottom-left of the screen.
 * New items will stack above first item.
 */
export class ToastBottomLeftPosition extends ToastBottomCenterPosition {
    static global = { ...ToastBottomCenterPosition.global, ...{ left: '1rem', center: false } };
    static connected = toastConnectedBottomLeftPosition;
}

/**
 * Toast Position class.
 * The first item will pop from the bottom-right of the screen.
 * New items will stack above first item.
 */
export class ToastBottomRightPosition extends ToastBottomCenterPosition {
    static global = { ...ToastBottomCenterPosition.global, ...{ right: '1rem', center: false } };
    static connected = toastConnectedBottomRightPosition;
}
