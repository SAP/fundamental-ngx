import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseToastConfig } from '../base-toast-config';
import { BaseToastContainerComponent } from '../base-toast-container.component';
import { ToastDurationDismissibleContainerComponent } from '../../interfaces/toast-duration-dismissible-container-component.interface';

@Directive()
export abstract class BaseToastDurationDismissibleContainerComponent<P extends BaseToastConfig>
    extends BaseToastContainerComponent<P>
    implements OnDestroy, ToastDurationDismissibleContainerComponent<P>
{
    /** Subject for notifying that component is out of hover */
    mouseleave$: Subject<void> = new Subject();

    /** Subject for notifying that component is hovered */
    mouseover$: Subject<void> = new Subject();

    /** @hidden */
    protected constructor(config: P) {
        super(config);
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
    }
}
