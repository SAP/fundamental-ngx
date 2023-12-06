import { OverlayRef } from '@angular/cdk/overlay';
import { BaseToastPosition } from '../../base-toast-positions';
import { BaseToastConfig } from '../base-toast-config';
import { BaseToastRef } from '../base-toast-ref';
import { BaseToastDurationDismissibleContainerComponent } from './base-toast-duration-dismissible-container.component';

/** Maximum number of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

export abstract class BaseToastDurationDismissibleRef<
    T = any,
    P extends BaseToastConfig<T> = any,
    C extends BaseToastDurationDismissibleContainerComponent<P> = BaseToastDurationDismissibleContainerComponent<P>
> extends BaseToastRef<T, P, C> {
    /**
     * Timeout ID for the duration setTimeout call. Used to clear the timeout if the toast is
     * dismissed before the duration passes.
     */
    protected durationTimeoutId!: ReturnType<typeof setTimeout>;

    /** @hidden */
    protected constructor(containerInstance: C, overlayRef: OverlayRef, positionStrategy: BaseToastPosition) {
        super(containerInstance, overlayRef, positionStrategy);
    }

    /** Dismisses the toast and clears the timeout. */
    override dismiss(): void {
        clearTimeout(this.durationTimeoutId);

        super.dismiss();
    }

    /** Dismisses the Toast component after some duration */
    dismissAfter(duration: number): void {
        this.durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
    }

    /** Cancels current dismiss timeout */
    cancelDismiss(): void {
        clearTimeout(this.durationTimeoutId);
    }
}
