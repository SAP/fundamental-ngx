import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostListener,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { delay, map, merge, startWith, Subject, takeUntil } from 'rxjs';
import { ListNavigationItemComponent } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-vertical-navigation',
    templateUrl: './vertical-navigation.component.html',
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationComponent implements AfterContentInit, OnDestroy {
    /** Whether or not this component is to be shown in 'condensed' mode. */
    @Input()
    condensed = false;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$ = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$ = new Subject<void>();

    /** @hidden */
    @ContentChildren(ListNavigationItemComponent, { descendants: true })
    private _navigationItems: QueryList<ListNavigationItemComponent>;

    /** @hidden
     * Querylist of list-items in main navigation.
     */
    @ContentChildren(ListNavigationItemComponent)
    private _mainNavigationItems: QueryList<ListNavigationItemComponent>;

    /** @hidden */
    private _keyManager: FocusKeyManager<ListNavigationItemComponent>;

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.condensed) {
            this._mainNavigationItems.forEach((navItem) => {
                navItem._condensed = true;
            });
        }
        this._keyManager?.destroy();
        this._keyManager = new FocusKeyManager(this._navigationItems)
            .withHomeAndEnd()
            .skipPredicate((item) => !item._isItemVisible || (item._condensed && item.expanded));
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number, updateOnly = false): void {
        if (updateOnly) {
            this._keyManager.updateActiveItem(index);
        } else {
            this._keyManager.setActiveItem(index);
        }
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        this._navigationItems.changes.pipe(delay(0), startWith(0), takeUntil(this._onDestroy$)).subscribe(() => {
            this._listenOnItemsClick();
            setTimeout(() => {
                // using setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
                this._navigationItems.forEach((navItem, index) => {
                    index !== 0 && (navItem._tabIndex = -1);
                });
            });
        });
    }

    /** @hidden */
    private _listenOnItemsClick(): void {
        /** Finish all the streams, from before */
        this._onRefresh$.next();

        /** Merge refresh/destroy observables */
        const completion$ = merge(this._onRefresh$, this._onDestroy$);
        const interactionChangesIndexes = this._navigationItems.map((item, index) =>
            merge(
                item._clicked$.pipe(map(() => ({ index, updateOnly: false }))),
                item._focused$.pipe(map((focusedOn) => ({ index, updateOnly: focusedOn })))
            )
        );
        merge(...interactionChangesIndexes)
            .pipe(takeUntil(completion$))
            .subscribe(({ index, updateOnly }) => this.setItemActive(index, updateOnly));
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        this._keyManager.onKeydown(event);
        event.stopPropagation();
    }
}
