import { Directive, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastDismissibleContainerComponent } from '../interfaces/toast-container-component.interface';
import { BaseToastConfig } from './base-toast-config';
import { BaseToastComponent } from './base-toast.component';

@Directive()
export abstract class BaseToastDurationDismissibleComponent<P extends BaseToastConfig>
    extends BaseToastComponent<P>
    implements OnDestroy, ToastDismissibleContainerComponent<P>
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
