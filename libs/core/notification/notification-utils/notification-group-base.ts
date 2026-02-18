import { afterNextRender, contentChildren, DestroyRef, Directive, inject, Injector, Renderer2 } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { merge, NEVER, Observable } from 'rxjs';
import { auditTime, filter, startWith, switchMap } from 'rxjs/operators';
import { NotificationActionsComponent } from '../notification-actions/notification-actions.component';
import { NotificationHeaderComponent } from '../notification-header/notification-header.component';

/**
 * @hidden
 * Base directive for notification components that need to set aria-describedby
 * on action buttons linking them to notification headers.
 */
@Directive()
export abstract class NotificationGroupBaseDirective {
    /** @hidden */
    readonly notificationHeader = contentChildren(NotificationHeaderComponent, { descendants: true });

    /** @hidden */
    readonly notificationActions = contentChildren(NotificationActionsComponent);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _injector = inject(Injector);

    constructor() {
        // Use afterNextRender to ensure DOM is ready before setting up the observable chain
        afterNextRender(() => this._setupAriaDescribedBy(), { injector: this._injector });
    }

    /**
     * Sets up reactive subscription to update aria-describedby on action buttons.
     * @hidden
     */
    private _setupAriaDescribedBy(): void {
        const headersChanges$ = this._createHeadersObservable();
        const actionsChanges$ = this._createActionsObservable();

        merge(headersChanges$, actionsChanges$)
            .pipe(
                auditTime(0), // batch emissions within the same tick
                filter(() => this._hasRequiredContent()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => this._applyAriaDescribedBy());
    }

    /**
     * Creates an observable that emits when notification headers change.
     * @hidden
     */
    private _createHeadersObservable(): Observable<readonly NotificationHeaderComponent[]> {
        return toObservable(this.notificationHeader, { injector: this._injector }).pipe(
            startWith(this.notificationHeader())
        );
    }

    /**
     * Creates an observable that emits when notification actions or their buttons change.
     * @hidden
     */
    private _createActionsObservable(): Observable<unknown> {
        return toObservable(this.notificationActions, { injector: this._injector }).pipe(
            startWith(this.notificationActions()),
            switchMap((actions) => {
                // Listen to button changes for each actions component
                // This ensures dynamically added buttons also get aria-describedby
                const buttonsChanges$ = actions.reduce(
                    (acc, c) => acc.concat(c.buttons.changes),
                    [] as Observable<unknown>[]
                );
                // Use NEVER to prevent completion when buttonsChanges$ is empty
                return merge(...buttonsChanges$, NEVER).pipe(startWith(0));
            })
        );
    }

    /**
     * Checks if required content (headers and buttons) exists.
     * @hidden
     */
    private _hasRequiredContent(): boolean {
        const headers = this.notificationHeader();
        const actions = this.notificationActions();

        if (headers.length === 0 || actions.length === 0) {
            return false;
        }
        return actions.some((a) => a.buttons.length > 0);
    }

    /**
     * Applies aria-describedby attribute to action buttons that don't already have it.
     * Uses the first header's uniqueId as the reference.
     * @hidden
     */
    private _applyAriaDescribedBy(): void {
        const firstHeader = this.notificationHeader()[0];
        const headerId = firstHeader.uniqueId();

        this.notificationActions().forEach((actionsComponent) => {
            actionsComponent.buttons
                .toArray()
                .map((b) => b.elementRef.nativeElement)
                .filter((b) => !b.hasAttribute('aria-describedby'))
                .forEach((b) => this._renderer.setAttribute(b, 'aria-describedby', headerId));
        });
    }
}
