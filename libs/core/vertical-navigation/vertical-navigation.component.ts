import { FocusKeyManager } from '@angular/cdk/a11y';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    HostListener,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { destroyObservable } from '@fundamental-ngx/cdk/utils';
import { ListComponent, ListNavigationItemComponent } from '@fundamental-ngx/core/list';
import { Subject, delay, map, merge, startWith, takeUntil } from 'rxjs';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.component';

/**
 * @deprecated use the (btp)vertical navigation component instead.
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
@Component({
    selector: 'fd-vertical-navigation',
    templateUrl: './vertical-navigation.component.html',
    styleUrl: './vertical-navigation.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [VerticalNavigationMainNavigationComponent, ListComponent]
})
export class VerticalNavigationComponent implements AfterContentInit, OnDestroy {
    /** Whether or not this component is to be shown in 'condensed' mode. */
    @Input()
    set condensed(value: boolean) {
        this._condensed.set(value);
    }

    get condensed(): boolean {
        return this._condensed();
    }

    /** @hidden */
    @ContentChildren(ListNavigationItemComponent, { descendants: true })
    private readonly _navigationItems: QueryList<ListNavigationItemComponent>;

    /** @hidden
     * Querylist of list-items in main navigation.
     */
    @ContentChildren(ListNavigationItemComponent)
    private set _mainItems(items: QueryList<ListNavigationItemComponent>) {
        this._mainNavItems.set(items?.toArray() ?? []);
    }

    /** @hidden */
    private _keyManager: FocusKeyManager<ListNavigationItemComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$ = new Subject<void>();

    /** @hidden */
    private readonly _condensed = signal(false);

    /** @hidden */
    private readonly _contentInited = signal(false);

    /** @hidden */
    private readonly _mainNavItems = signal<ListNavigationItemComponent[]>([]);

    /** @hidden */
    constructor() {
        effect(() => {
            if (!this._contentInited()) {
                return;
            }

            const isCondensed = this._condensed();

            this._mainNavItems().forEach((item) => {
                item._condensed.set(isCondensed);
            });
        });
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        this._keyManager.onKeydown(event);
        event.stopPropagation();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._contentInited.set(true);

        this._keyManager?.destroy();
        this._keyManager = new FocusKeyManager(this._navigationItems)
            .withHomeAndEnd()
            .skipPredicate((item) => !item._isItemVisible || (item._condensed() && item.expanded));
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
        this._onRefresh$.next();
        this._onRefresh$.complete();
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
        this._navigationItems.changes
            .pipe(delay(0), startWith(0), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
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
        const completion$ = merge(this._onRefresh$, destroyObservable(this._destroyRef));
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
}
