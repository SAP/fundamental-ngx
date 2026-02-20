import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, DestroyRef, Directive, ElementRef, inject, input, isDevMode, signal } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { destroyObservable } from '@fundamental-ngx/cdk/utils';
import { fromEvent, map, merge, Observable, of, startWith, takeUntil } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageStripComponent } from './message-strip.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-strip[mousePersist], fd-message-strip[duration], fd-message-strip[autoDismiss]',
    exportAs: 'fdAutoDismissMessageStrip',
    standalone: true,
    host: {
        '[style.display]': '!_opened() ? "none" : null'
    }
})
export class AutoDismissMessageStripDirective {
    /** Whether the message strip is dismissible */
    readonly dismissible = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

    /** Whether the alert should be automatically dismissed. */
    readonly autoDismiss = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    readonly duration = input(10000);

    /** Whether the alert should stay open if the mouse is hovering over it. */
    readonly mousePersist = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /**
     * Whether the message strip is currently opened.
     * @hidden
     */
    protected readonly _opened = signal(false);

    /** @hidden */
    private readonly _messageStripComponent = inject(MessageStripComponent, { optional: false, host: true });

    /** @hidden */
    private readonly _onDismiss$ = outputToObservable(this._messageStripComponent.onDismiss);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _autoDismissTimeout?: ReturnType<typeof setTimeout>;

    /** @hidden */
    private _mouseIn$?: Observable<boolean>;

    /**
     * Gets observable tracking mouse hover state.
     * Lazily initialized to ensure ElementRef is available.
     * @hidden
     */
    private get _mouseIn(): Observable<boolean> {
        if (!this._mouseIn$) {
            this._mouseIn$ = merge(
                fromEvent(this._elementRef.nativeElement, 'mouseenter').pipe(map(() => true)),
                fromEvent(this._elementRef.nativeElement, 'mouseleave').pipe(map(() => false))
            ).pipe(startWith(false));
        }
        return this._mouseIn$;
    }

    /**
     * Opens the message strip and starts auto-dismiss timer if configured.
     * This method is part of the public API via exportAs.
     */
    open(): void {
        this._opened.set(true);
        this._elementRef.nativeElement.classList.remove('fd-has-display-block');
        this._elementRef.nativeElement.classList.remove('fd-has-display-none');
        this._stopAutoDismiss();
        if (this.autoDismiss() && !this.dismissible() && isDevMode()) {
            console.warn(
                'Auto dismiss is enabled but the message strip is not dismissible. Please set the dismissible input to true.'
            );
        }
        if (this.autoDismiss() && this.dismissible()) {
            this._startAutoDismiss();
        }
    }

    /** @hidden */
    private _stopAutoDismiss(): void {
        if (this._autoDismissTimeout) {
            clearTimeout(this._autoDismissTimeout);
            this._autoDismissTimeout = undefined;
        }
    }

    /** @hidden */
    private _startAutoDismiss(): void {
        const startAutoDismissTimer$ = new Observable((res) => {
            this._autoDismissTimeout = setTimeout(() => {
                this._dismiss();
                res.next(null);
            }, this.duration());
            return () => this._stopAutoDismiss();
        });
        if (this.duration() > -1) {
            const source$ = this.mousePersist()
                ? this._mouseIn.pipe(
                      switchMap((mouseIn) => {
                          if (mouseIn) {
                              return of(null);
                          }
                          return startAutoDismissTimer$;
                      })
                  )
                : startAutoDismissTimer$;
            source$.pipe(takeUntil(merge(destroyObservable(this._destroyRef), this._onDismiss$))).subscribe();
        }
    }

    /** @hidden */
    private _dismiss(): void {
        this._messageStripComponent.dismiss();
    }
}
