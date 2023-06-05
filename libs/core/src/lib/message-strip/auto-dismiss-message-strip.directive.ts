import { AfterViewInit, Directive, ElementRef, inject, Input, isDevMode } from '@angular/core';
import { MessageStripComponent } from './message-strip.component';
import { BehaviorSubject, combineLatest, finalize, fromEvent, map, merge, startWith, takeUntil, tap } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { filter } from 'rxjs/operators';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-strip[mousePersist], fd-message-strip[duration], fd-message-strip[autoDismiss]',
    standalone: true,
    providers: [DestroyedService]
})
export class AutoDismissMessageStripDirective implements AfterViewInit {
    /** Whether the message strip is dismissible */
    @Input()
    set dismissible(dismissible: boolean) {
        this.dismissible$.next(dismissible);
    }

    /** Whether the alert should be automatically dismissed. */
    @Input()
    set autoDismiss(autoDismiss: boolean) {
        this.autoDismiss$.next(autoDismiss);
    }

    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    @Input()
    set duration(duration: number) {
        this.duration$.next(duration);
    }

    /** Whether the alert should stay open if the mouse is hovering over it. */
    @Input()
    set mousePersist(mousePersist: boolean) {
        this.mousePersist$.next(mousePersist);
    }

    /** @hidden */
    private autoDismissTimeout?: ReturnType<typeof setTimeout>;
    /** @hidden */
    private elementRef = inject(ElementRef);
    /** @hidden */
    private messageStripComponent = inject(MessageStripComponent, { optional: false, host: true });

    /** @hidden */
    private dismissible$ = new BehaviorSubject<boolean>(this.messageStripComponent.dismissible); // Take the initial value from the message strip component
    /** @hidden */
    private autoDismiss$ = new BehaviorSubject<boolean>(true);
    /** @hidden */
    private duration$ = new BehaviorSubject<number>(10000);
    /** @hidden */
    private mousePersist$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private destroy$ = inject(DestroyedService);

    /**
     * Mouse is hovering over the message strip.
     * */
    private mouseIn$ = merge(
        fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(map(() => true)),
        fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(map(() => false))
    ).pipe(startWith(false));

    /** @hidden */
    ngAfterViewInit(): void {
        combineLatest([this.autoDismiss$, this.dismissible$])
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => this.stopAutoDismiss())
            )
            .subscribe(([autoDismiss, dismissible]) => {
                this.stopAutoDismiss();
                if (autoDismiss && !dismissible && isDevMode()) {
                    console.warn(
                        'Auto dismiss is enabled but the message strip is not dismissible. Please set the dismissible input to true.'
                    );
                }
                if (autoDismiss && dismissible) {
                    this.startAutoDismiss();
                }
            });
    }

    /** @hidden */
    private stopAutoDismiss(): void {
        if (this.autoDismissTimeout) {
            clearTimeout(this.autoDismissTimeout);
            this.autoDismissTimeout = undefined;
        }
    }

    /** @hidden */
    private startAutoDismiss(): void {
        combineLatest([this.duration$, this.mousePersist$, this.mouseIn$])
            .pipe(
                tap(([duration, mousePersist, mouseIn]) => {
                    if (mouseIn && mousePersist && this.autoDismissTimeout) {
                        this.stopAutoDismiss();
                        return;
                    }
                    if (duration > -1) {
                        this.autoDismissTimeout = setTimeout(this.dismiss, duration);
                    } else {
                        this.stopAutoDismiss();
                    }
                }),
                takeUntil(merge(this.destroy$, this.autoDismiss$.pipe(filter((autoDismiss) => !autoDismiss))))
            )
            .subscribe();
    }

    /** @hidden */
    private dismiss = (): void => this.messageStripComponent.dismiss();
}
