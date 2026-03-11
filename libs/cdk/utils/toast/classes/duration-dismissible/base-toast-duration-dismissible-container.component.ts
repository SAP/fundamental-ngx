import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastDurationDismissibleContainerComponent } from '../../interfaces/toast-duration-dismissible-container-component.interface';
import { BaseToastAnimatedContainerComponent } from '../base-toast-animated-container.component';
import { BaseToastConfig } from '../base-toast-config';

@Directive({
    host: {
        '(mouseleave)': 'mouseleave$.next()',
        '(mouseover)': 'mouseover$.next()'
    }
})
export abstract class BaseToastDurationDismissibleContainerComponent<P extends BaseToastConfig>
    extends BaseToastAnimatedContainerComponent<P>
    implements OnDestroy, ToastDurationDismissibleContainerComponent<P>
{
    /** Subject for notifying that component is out of hover. */
    readonly mouseleave$: Subject<void> = new Subject();

    /** Subject for notifying that component is hovered. */
    readonly mouseover$: Subject<void> = new Subject();

    /** @Hidden */
    override ngOnDestroy(): void {
        this.mouseover$.complete();
        this.mouseleave$.complete();

        super.ngOnDestroy();
    }
}
