import { Directive, ElementRef, inject, Input, isDevMode } from '@angular/core';
import { MessageStripComponent } from './message-strip.component';
import { fromEvent, map, merge, Observable, of, startWith, takeUntil } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { switchMap } from 'rxjs/operators';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-strip[mousePersist], fd-message-strip[duration], fd-message-strip[autoDismiss]',
    exportAs: 'fdAutoDismissMessageStrip',
    standalone: true,
    providers: [DestroyedService],
    host: {
        '[style.display]': '!opened ? "none" : null'
    }
})
export class AutoDismissMessageStripDirective {
    /** @hidden */
    private messageStripComponent = inject(MessageStripComponent, { optional: false, host: true });

    /** Whether the message strip is dismissible */
    @Input() dismissible = true;

    /** Whether the alert should be automatically dismissed. */
    @Input() autoDismiss = true;

    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    @Input() duration = 10000;

    /** Whether the alert should stay open if the mouse is hovering over it. */
    @Input() mousePersist = false;

    /** Whether the message strip is currently opened. */
    opened = false;

    /** @hidden */
    private autoDismissTimeout?: ReturnType<typeof setTimeout>;
    /** @hidden */
    private elementRef = inject(ElementRef);

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
    open(): void {
        this.opened = true;
        this.elementRef.nativeElement.classList.remove('fd-has-display-block');
        this.elementRef.nativeElement.classList.remove('fd-has-display-none');
        this.stopAutoDismiss();
        if (this.autoDismiss && !this.dismissible && isDevMode()) {
            console.warn(
                'Auto dismiss is enabled but the message strip is not dismissible. Please set the dismissible input to true.'
            );
        }
        if (this.autoDismiss && this.dismissible) {
            this.startAutoDismiss();
        }
    }

    /** @hidden */
    private stopAutoDismiss = (): void => {
        if (this.autoDismissTimeout) {
            clearTimeout(this.autoDismissTimeout);
            this.autoDismissTimeout = undefined;
        }
    };

    /** @hidden */
    private startAutoDismiss(): void {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const startAutoDismissTimer$ = new Observable((res) => {
            this.autoDismissTimeout = setTimeout(() => {
                this.dismiss();
                res.next();
            }, this.duration);
            return this.stopAutoDismiss;
        });
        if (this.duration > -1) {
            const source$ = this.mousePersist
                ? this.mouseIn$.pipe(
                      switchMap((mouseIn) => {
                          if (mouseIn) {
                              return of(null);
                          }
                          return startAutoDismissTimer$;
                      })
                  )
                : startAutoDismissTimer$;
            source$.pipe(takeUntil(merge(this.destroy$, this.messageStripComponent.onDismiss))).subscribe();
        }
    }

    /** @hidden */
    private dismiss = (): void => this.messageStripComponent.dismiss();
}
