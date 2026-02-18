import { AfterViewInit, ContentChildren, DestroyRef, Directive, QueryList, Renderer2, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NEVER, Observable, merge } from 'rxjs';
import { auditTime, filter, startWith, switchMap } from 'rxjs/operators';
import { NotificationActionsComponent } from '../notification-actions/notification-actions.component';
import { NotificationHeaderComponent } from '../notification-header/notification-header.component';

@Directive()
export abstract class NotificationGroupBaseDirective implements AfterViewInit {
    /** @hidden */
    @ContentChildren(NotificationHeaderComponent, { descendants: true })
    notificationHeader: QueryList<NotificationHeaderComponent>;

    /** @hidden */
    @ContentChildren(NotificationActionsComponent)
    notificationActions: QueryList<NotificationActionsComponent>;

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    ngAfterViewInit(): void {
        // TODO: update startWith args to be "undefined" after migration to rxjs 7.
        // Now it throws irrelevant warning about deprecation
        const headersChanges$ = this.notificationHeader.changes.pipe(startWith(0));
        const actionsChanges$ = this.notificationActions.changes.pipe(
            startWith(0),
            switchMap(() => {
                // also listen to button changes for each notificationActions component
                const buttonsChanges$ = this.notificationActions
                    .toArray()
                    .reduce((acc, c) => acc.concat(c.buttons.changes), [] as Observable<any>[]);
                // Use NEVER to prevent the inner observable from completing when buttonsChanges$ is empty
                return merge(...buttonsChanges$, NEVER).pipe(startWith(0));
            })
        );
        merge(headersChanges$, actionsChanges$)
            .pipe(
                auditTime(0), // batch emissions within the same tick
                filter(() => {
                    // Check that both header and actions exist, and at least one action has buttons
                    const hasHeaders = this.notificationHeader.length > 0;
                    const hasActions = this.notificationActions.length > 0;
                    const hasButtons = this.notificationActions.some((a) => a.buttons.length > 0);
                    if (!hasHeaders || !hasActions) {
                        return false;
                    }
                    return hasButtons;
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                // using only the first header for "aria-describedby" of associated buttons
                const firstHeader = this.notificationHeader.first;
                this.notificationActions.forEach((actionsComponent) => {
                    actionsComponent.buttons
                        .toArray()
                        .map((b) => b.elementRef.nativeElement)
                        // skipping buttons that already have this attribute
                        .filter((b) => !b.hasAttribute('aria-describedby'))
                        .forEach((b) => {
                            // setting aria-describedby on each button with an id of related header
                            this._renderer.setAttribute(b, 'aria-describedby', firstHeader.uniqueId());
                        });
                });
            });
    }
}
