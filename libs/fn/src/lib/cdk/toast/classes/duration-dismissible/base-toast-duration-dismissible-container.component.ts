import { Directive, HostListener, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseToastAnimatedContainerComponent } from '../base-toast-animated-container.component';
import { BaseToastConfig } from '../base-toast-config';
import { ToastDurationDismissibleContainerComponent } from '../../interfaces/toast-duration-dismissible-container-component.interface';

@Directive()
export abstract class BaseToastDurationDismissibleContainerComponent<P extends BaseToastConfig>
    extends BaseToastAnimatedContainerComponent<P>
    implements OnDestroy, ToastDurationDismissibleContainerComponent<P>
{
    /** Subject for notifying that component is out of hover */
    readonly mouseleave$: Subject<void> = new Subject();

    /** Subject for notifying that component is hovered */
    readonly mouseover$: Subject<void> = new Subject();

    /** @hidden */
    protected constructor(protected _ngZone: NgZone, config: P) {
        super(_ngZone, config);
    }

    /** Emits mouseleave$ subject when component is out of hover. */
    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.mouseleave$.next();
    }

    /** Emits mouseover$ subject when component is hovered. */
    @HostListener('mouseover')
    onMouseOver(): void {
        this.mouseover$.next();
    }

    /** @Hidden */
    ngOnDestroy(): void {
        this.mouseover$.complete();
        this.mouseleave$.complete();

        super.ngOnDestroy();
    }
}
