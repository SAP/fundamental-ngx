import { AfterViewInit, Directive, ContentChildren, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationActionsComponent } from '../notification-actions/notification-actions.component';
import { NotificationHeaderComponent } from '../notification-header/notification-header.component';

@Directive()
export abstract class NotificationGroupBaseDirective implements AfterViewInit, OnDestroy {
    /** @hidden */
    @ContentChildren(NotificationHeaderComponent, { descendants: true })
    notificationHeader: QueryList<NotificationHeaderComponent>;

    /** @hidden */
    @ContentChildren(NotificationActionsComponent)
    notificationActions: QueryList<NotificationActionsComponent>;

    /** @hidden */
    private readonly onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(private renderer: Renderer2) {}

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
                return merge(buttonsChanges$).pipe(startWith(0));
            })
        );
        merge(headersChanges$, actionsChanges$)
            .pipe(
                debounceTime(10), // omitting extra emissions
                filter(() => this.notificationHeader.length > 0 && this.notificationActions.length > 0),
                takeUntil(this.onDestroy$)
            )
            .subscribe(() => {
                // using only the first header for "aria-describedby" of associated buttons
                const firstHeader = this.notificationHeader.first;
                this.notificationActions.forEach((actionsComponent) => {
                    actionsComponent.buttons
                        .toArray()
                        .map((b) => b.elementRef().nativeElement)
                        // skipping buttons that already have this attribute
                        .filter((b) => !b.hasAttribute('aria-describedby'))
                        .forEach((b) => {
                            // setting aria-describedby on each button with an id of related header
                            this.renderer.setAttribute(b, 'aria-describedby', firstHeader.uniqueId);
                        });
                });
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
    }
}
