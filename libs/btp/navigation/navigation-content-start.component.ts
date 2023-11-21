/* eslint-disable no-unused-vars */

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable, resizeObservable } from '@fundamental-ngx/cdk/utils';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { Subject, asyncScheduler, debounceTime, distinctUntilChanged, filter, observeOn, startWith, tap } from 'rxjs';
import { FdbNavigationComponent } from './navigation-component.token';
import { NavigationContentComponent } from './navigation-content.token';
import { NavigationLinkComponent } from './navigation-link.component';
import { FdbNavigationListComponent } from './navigation-list-component.token';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';
import { NavigationListItemComponent } from './navigation-list/navigation-list-item.component';
import { NavigationListOverflowItemComponent } from './navigation-list/navigation-list-overflow-item.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';

const FD_NAVIGATION_OVERFLOW_ITEM_CLASS = 'fd-navigation__container--hidden-overflow';

@Component({
    selector: 'fdb-navigation-content-start',
    templateUrl: './navigation-content-start.component.html',
    standalone: true,
    imports: [
        NavigationListComponent,
        NavigationListItemComponent,
        NavigationLinkComponent,
        NavigationListOverflowItemComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NavigationContentComponent,
            useExisting: NavigationContentStartComponent
        }
    ],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'fd-navigation__container fd-navigation__container--top',
        '[style.flex-grow]': '1'
    },
    hostDirectives: [ScrollbarDirective]
})
export class NavigationContentStartComponent extends NavigationContentComponent implements AfterViewInit {
    /** @hidden */
    @ContentChildren(FdbNavigationListItemComponent, { descendants: true })
    private readonly _navigationItems: QueryList<FdbNavigationListItemComponent>;

    /** @hidden */
    @ContentChildren(FdbNavigationListComponent)
    private readonly _navigationLists: QueryList<FdbNavigationListComponent>;

    /** @hidden */
    @ViewChild('showMoreOverflowMenu', { static: false, read: ElementRef })
    private readonly _showMoreOverflow: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('showMoreOverflowItem', { static: false, read: FdbNavigationListItemComponent })
    private set _showMoreOverflowItemCmp(value: Nullable<FdbNavigationListItemComponent>) {
        this.showMoreOverflowItem = value;
        this.refresh$.next();
    }

    /** @hidden */
    linkTemplate = inject(FdbNavigationComponent).homeLinkTemplate;
    /** @hidden */
    showHome = true;

    /** @hidden */
    showOverflowButton = signal(false);

    /** @hidden */
    _hiddenItems: FdbNavigationListItemComponent[] = [];

    /** @hidden */
    override refresh$ = new Subject<void>();

    /** @hidden */
    private _calculationInProgress = false;

    /** @hidden */
    private readonly _canTrackItems = signal(false);

    /** @hidden */
    private readonly _navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _scrollbar = inject(ScrollbarDirective);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        super();

        effect(
            () => {
                if (!this._canTrackItems()) {
                    return;
                }
                // We need to also listen to snapped state.
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const snapped = this._navigationComponent.isSnapped();
                this._elementRef.nativeElement.scrollTop = 0;
                setTimeout(() => {
                    this._calculateVisibleItems();
                });
            },
            {
                allowSignalWrites: true
            }
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._canTrackItems.set(true);
        this._navigationItems.changes
            .pipe(startWith(null))
            .pipe(
                tap(() => {
                    this.refresh$.next();
                }),
                filter(() => this._navigationItems?.length > 0),
                observeOn(asyncScheduler),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._calculateVisibleItems();
            });

        resizeObservable(this._elementRef.nativeElement)
            .pipe(
                debounceTime(30),
                distinctUntilChanged((prev, current) => prev[0].contentRect.height === current[0].contentRect.height),
                filter(() => !this._calculationInProgress),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._calculateVisibleItems();
            });
    }

    /** @hidden */
    getNavigatableItems(): FdbNavigationListItemComponent[] {
        const items = this._navigationItems.toArray();
        if (this.showMoreOverflowItem) {
            items.push(this.showMoreOverflowItem);
        }
        return items;
    }

    /** @hidden */
    showMoreOpened(): boolean {
        return !!this.showMoreOverflowItem?.isOpen;
    }

    /** @hidden */
    private _calculateVisibleItems(): void {
        if (this._calculationInProgress) {
            return;
        }
        this._calculationInProgress = true;
        this._hiddenItems = [];
        this._cdr.detectChanges();
        if (!this._navigationComponent.isSnapped()) {
            this._navigationItems.forEach((item) => {
                item.show();
            });
            this.showOverflowButton.set(false);
            setTimeout(() => {
                this._calculationInProgress = false;
            });
            return;
        }
        this._elementRef.nativeElement.classList.add(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);
        this.showOverflowButton.set(true);
        this._cdr.detectChanges();
        let canDisplayItems = true;
        const containerHeight = this._elementRef.nativeElement.getBoundingClientRect().height;
        const showMoreHeight =
            (this.showMoreOverflowItem?.elementRef.nativeElement.getBoundingClientRect().height || 0) * 2;
        const homeElementSize = this._navigationLists.toArray().reduce((height, list) => {
            height += list.getHomeElementSize().height;
            return height;
        }, 0);
        let totalAvailableHeight = containerHeight - showMoreHeight - homeElementSize;

        const hiddenElements: FdbNavigationListItemComponent[] = [];

        const navigationItemGroups = this._navigationItems.reduce(
            (acc: { root: FdbNavigationListItemComponent[]; children: FdbNavigationListItemComponent[] }, item) => {
                const itemLevel = item.normalizedLevel();
                if (itemLevel > 2) {
                    return acc;
                }
                acc[itemLevel === 1 ? 'root' : 'children'].push(item);
                return acc;
            },
            { root: [], children: [] }
        );

        this._navigationItems.forEach((item) => {
            item.show();
        });

        navigationItemGroups.children.forEach((item) => {
            item.calculateExpanded();
            if (!canDisplayItems) {
                item.hide();
                hiddenElements.push(item);
                return;
            }

            // item.show();

            totalAvailableHeight -= item.elementRef.nativeElement.getBoundingClientRect().height;

            if (totalAvailableHeight <= 0) {
                canDisplayItems = false;
                item.hide();
                hiddenElements.push(item);
                return;
            }
        });

        navigationItemGroups.root.forEach((item) => {
            item.checkSelfHidden();
        });

        this._elementRef.nativeElement.classList.remove(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);

        this._handleOverflowItems(hiddenElements);
        setTimeout(() => {
            this._calculationInProgress = false;
        }, 5);
    }

    /** @hidden */
    private _handleOverflowItems(items: FdbNavigationListItemComponent[]): void {
        this.showOverflowButton.set(items.length > 0);
        this._hiddenItems = items;
        this._cdr.detectChanges();
    }
}
