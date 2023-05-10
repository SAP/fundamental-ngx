import { ToastContainerComponent } from './toast-container-component.interface';
import { Subject } from 'rxjs';

export interface ToastDurationDismissibleContainerComponent<P> extends ToastContainerComponent<P> {
    mouseover$: Subject<void>;
    mouseleave$: Subject<void>;
}
