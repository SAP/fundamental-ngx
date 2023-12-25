/* eslint-disable no-unused-vars */
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    computed,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Nullable, resizeObservable } from '@fundamental-ngx/cdk/utils';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { asyncScheduler, debounceTime, filter, merge, observeOn, startWith, switchMap, take } from 'rxjs';
import { FdbNavigationContentContainer } from '../../models/navigation-content-container.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';
import { NavigationMoreButtonComponent } from '../navigation-more-button/navigation-more-button.component';

const FD_NAVIGATION_OVERFLOW_ITEM_CLASS = 'fd-navigation__container--hidden-overflow';

@Component({
    selector: 'fdb-navigation-content-start',
    templateUrl: './navigation-content-start.component.html',
    standalone: true,
    imports: [NavigationListComponent, NavigationMoreButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-navigation__container fd-navigation__container--top',
        '[style.flex-grow]': '1'
    },
    providers: [
        {
            provide: FdbNavigationContentContainer,
            useExisting: NavigationContentStartComponent
        }
    ],
    hostDirectives: [ScrollbarDirective]
})
export class NavigationContentStartComponent extends FdbNavigationContentContainer implements AfterContentInit {
    /** Whether the list items are content-projected. Used only with data-driven navigation. */
    @Input()
    contentProjected = true;

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: true })
    private readonly _listItems: QueryList<FdbNavigationListItem>;

    /** @hidden */
    @ViewChild('listContainer', { read: ElementRef })
    private readonly _listContainer: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('moreContainer', { read: ElementRef, static: false })
    private readonly _moreContainer: Nullable<ElementRef>;

    /** @hidden */
    @ViewChild(NavigationMoreButtonComponent, { static: false })
    private readonly _showMoreButton: Nullable<FdbNavigationListItem>;

    @ViewChild('moreButton', { read: ElementRef, static: false })
    private readonly _showMoreButtonElement: Nullable<ElementRef<HTMLLIElement>>;

    /** Whether the container is placed on the start position, or the end position of the navigation. */
    readonly placement: 'start' | 'end' = 'start';

    /** Navigation component reference. */
    readonly navigation = inject(FdbNavigation);

    /** Inner List items that should be rendered. */
    readonly listItems$ = computed(() => {
        const isSnapped = this.navigation.isSnapped$();
        const totalItems = this.allListItems$().filter((item) => item.normalizedLevel$() < 3);
        return totalItems.filter((item) => {
            const normalizedLevel = item.normalizedLevel$();
            const level = item.level$();
            return isSnapped ? normalizedLevel === 2 : level === 1;
        });
    });

    /** @hidden */
    readonly _showMoreButton$ = signal(false);

    /** @hidden */
    readonly visibleItems$ = signal<FdbNavigationListItem[]>(this.listItems$());

    /** @hidden */
    readonly hiddenItems$ = signal<FdbNavigationListItem[]>([]);

    /** @hidden */
    private _calculationInProgress = false;

    /** @hidden */
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** @hidden */
    private readonly _isSnappedObservable = toObservable(this.navigation.isSnapped$).pipe(
        startWith(this.navigation.isSnapped$())
    );

    /** @hidden */
    private readonly _listItemsObservable = toObservable(this.listItems$);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private readonly _navigationService = inject(NavigationService);

    /** @hidden */
    ngAfterContentInit(): void {
        this._listItems.changes
            .pipe(
                startWith(null),
                observeOn(asyncScheduler),
                filter(() => this.contentProjected),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this.allListItems$.set(this._listItems.toArray());
            });

        const resize = resizeObservable(this._elementRef.nativeElement).pipe(debounceTime(30));

        merge(
            this._isSnappedObservable,
            this._listItemsObservable,
            resize,
            this._navigationService.recalculateVisibleItems$
        )
            .pipe(switchMap(() => this._zone.onStable.pipe(startWith(this._zone.isStable), take(1))))
            .subscribe(() => {
                this._calculateVisibleItems();
            });
    }

    /**
     * @hidden
     * Calculates available space to fit the items.
     * Determines whether to show the "More" button if available space is not enough to fit all list items.
     */
    private _calculateVisibleItems(): void {
        if (this._calculationInProgress) {
            return;
        }
        this._calculationInProgress = true;
        const items = [...this.listItems$()];
        items.forEach((item) => item.hidden$.set(false));
        this.visibleItems$.set([...items]);
        this._cdr.detectChanges();
        if (!this.navigation.isSnapped$()) {
            this._showMoreButton$.set(false);
            this._calculationInProgress = false;
            this.navigation.showMoreButton$.set(null);
            return;
        }

        this._elementRef.nativeElement.classList.add(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);

        let availableSpace = this._elementRef.nativeElement.clientHeight - this._elementRef.nativeElement.scrollHeight;

        if (availableSpace >= 0) {
            this._showMoreButton$.set(false);
            this._calculationInProgress = false;
            this.navigation.showMoreButton$.set(null);
            this._elementRef.nativeElement.classList.remove(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);
            this._cdr.detectChanges();
            return;
        }

        this._showMoreButton$.set(true);
        this._cdr.detectChanges();
        availableSpace = availableSpace - (this._showMoreButtonElement?.nativeElement.clientHeight || 0);

        const hiddenItems: FdbNavigationListItem[] = [];
        const visibleItems: FdbNavigationListItem[] = [];

        const gap = parseInt(getComputedStyle(this._listContainer.nativeElement).gap, 10);

        // We are going from the bottom to the top and checking whether the available space is enough to fit the items.
        for (let index = items.length - 1; index >= 0; index--) {
            const item = items[index];

            if (item.isActiveAttr$() || availableSpace >= 0) {
                visibleItems.unshift(item);
                continue;
            }

            // Since we are going from the bottom to the top, we need to add item to the list as the first item of the array.
            hiddenItems.unshift(item);
            const clientHeight =
                Math.ceil(item?.marker?.elementRef.nativeElement.getBoundingClientRect().height || 0) + gap * 1;
            availableSpace = availableSpace + clientHeight;
            item.hidden$.set(true);
        }

        this._elementRef.nativeElement.classList.remove(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);

        this.visibleItems$.set([...visibleItems]);
        this.hiddenItems$.set([...hiddenItems]);

        this._showMoreButton$.set(hiddenItems.length > 0);
        this._cdr.detectChanges();

        this.navigation.showMoreButton$.set(this._showMoreButton);

        this._calculationInProgress = false;
    }
}
