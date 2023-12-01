import { Subject } from 'rxjs';
import { ToastContainerComponent } from './toast-container-component.interface';

export interface ToastDurationDismissibleContainerComponent<P> extends ToastContainerComponent<P> {
    mouseover$: Subject<void>;
    mouseleave$: Subject<void>;
}
