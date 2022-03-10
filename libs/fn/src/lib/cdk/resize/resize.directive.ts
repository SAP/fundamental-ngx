import { Directive, Output } from '@angular/core';
import { ResizeService } from './resize.service';
import { finalize, Observable, Subscriber } from 'rxjs';

@Directive({
    selector: '[fnResize]',
    providers: [ResizeService]
})
export class ResizeDirective {
    @Output() fnResize = new Observable((observer: Subscriber<ResizeObserverEntry>) => {
        const resizeSubscription = this.resizeService
            .pipe(finalize(() => observer.unsubscribe()))
            .subscribe((state) => {
                observer.next(state);
            });
        return function unsubscribe(): void {
            resizeSubscription.unsubscribe();
        };
    });

    constructor(private resizeService: ResizeService) {}
}
