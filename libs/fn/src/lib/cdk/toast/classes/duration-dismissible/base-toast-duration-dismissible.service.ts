import { EmbeddedViewRef } from '@angular/core';
import { BaseToastService } from '../../base-toast.service';
import { BaseToastDurationDismissibleConfig } from './base-toast-duration-dismissible-config';
import { BaseToastDurationDismissibleContainerComponent } from './base-toast-duration-dismissible-container.component';
import { BaseToastDurationDismissibleRef } from './base-toast-duration-dismissible-ref';

export abstract class BaseDismissibleToastService<
    P extends BaseToastDurationDismissibleConfig,
    C extends BaseToastDurationDismissibleContainerComponent<P> = BaseToastDurationDismissibleContainerComponent<P>
> extends BaseToastService<P, C> {
    /**
     * Animates the old Toast out and the new one in.
     */
    protected animateToast<T>(toastRef: BaseToastDurationDismissibleRef<T | EmbeddedViewRef<any>, P>): void {
        super.animateToast<T>(toastRef);

        const config = toastRef.containerInstance.config;

        // If dismiss timeout is provided, set up dismiss based on after the Notification is opened.
        if (config.duration && config.duration > 0) {
            toastRef.afterOpened().subscribe(() => {
                toastRef.dismissAfter(config.duration as number);

                if (config.mousePersist) {
                    toastRef.containerInstance.mouseover$.subscribe(() => {
                        toastRef.cancelDismiss();
                    });

                    toastRef.containerInstance.mouseleave$.subscribe(() => {
                        toastRef.dismissAfter(config.duration as number);
                    });
                }
            });
        }
    }
}
