import { FocusKeyManager } from '@angular/cdk/a11y';
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
import { asyncScheduler, debounceTime, filter, merge, observeOn, startWith, switchMap, take } from 'rxjs';
import { FdbNavigationContentContainer } from '../../models/navigation-content-container.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';
import { NavigationMoreButtonComponent } from '../navigation-more-button/navigation-more-button.component';

const FD_NAVIGATION_OVERFLOW_ITEM_CLASS = 'fd-navigation__container--hidden-overflow';

@Component({
    selector: 'fdb-navigation-container',
    standalone: true,
    imports: [NavigationListComponent, NavigationMoreButtonComponent],
    templateUrl: './navigation-container.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-navigation__container'
    },
    providers: [
        {
            provide: FdbNavigationContentContainer,
            useExisting: NavigationContainerComponent
        }
    ]
})
export class NavigationContainerComponent extends FdbNavigationContentContainer implements AfterContentInit {
    /** Whether the list items are content-projected. Used only with data-driven navigation. */
    @Input()
    contentProjected = true;

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: true })
    private readonly _listItems: QueryList<FdbNavigationListItem>;

    /** @hidden */
    @ViewChild('moreContainer', { read: ElementRef, static: false })
    private readonly _moreContainer: Nullable<ElementRef>;

    /** @hidden */
    @ViewChild(NavigationMoreButtonComponent, { static: false })
    private readonly _showMoreButton: Nullable<FdbNavigationListItem>;

    /** @hidden */
    @ViewChild('listContainer', { read: ElementRef })
    private readonly _listContainer: ElementRef<HTMLElement>;

    /** Container placement. */
    placement: 'start' | 'end' = 'start';

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
    private readonly _renderers$ = toObservable(computed(() => this.listItems$().map((i) => i.renderer$())));

    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    private _hiddenItemsKeyManager: FocusKeyManager<FdbNavigationListItem>;

    private readonly _zone = inject(NgZone);
    private readonly _cdr = inject(ChangeDetectorRef);

    private readonly _navigationService = inject(NavigationService);

    /** @hidden */
    private _calculationInProgress = false;

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

        const resize = resizeObservable(this._elementRef.nativeElement).pipe(debounceTime(0));

        merge(this._renderers$, resize)
            .pipe(
                switchMap(() => this._zone.onStable.pipe(startWith(this._zone.isStable), take(1))),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this._calculateVisibleItems();
            });
    }

    private _calculateVisibleItems(): void {
        if (this._calculationInProgress) {
            return;
        }
        this._elementRef.nativeElement.classList.add(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);
        this._calculationInProgress = true;
        const items = [...this.listItems$()];
        items.forEach((item) => item.hidden$.set(false));
        this.visibleItems$.set([...items]);
        this._cdr.detectChanges();

        let availableSpace = this._elementRef.nativeElement.clientWidth - this._elementRef.nativeElement.scrollWidth;

        if (availableSpace >= 0) {
            this._showMoreButton$.set(false);
            this._calculationInProgress = false;
            this.navigation.showMoreButton$.set(null);
            this._cdr.detectChanges();
            this._elementRef.nativeElement.classList.remove(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);
            return;
        }

        this._showMoreButton$.set(true);
        this._cdr.detectChanges();
        availableSpace = availableSpace - (this._moreContainer?.nativeElement.clientWidth || 0);

        if (availableSpace >= 0) {
            this._showMoreButton$.set(false);
            this._calculationInProgress = false;
            this.navigation.showMoreButton$.set(null);
            this._elementRef.nativeElement.classList.remove(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);
            this._cdr.detectChanges();
            return;
        }

        const hiddenItems: FdbNavigationListItem[] = [];

        const gap = parseInt(getComputedStyle(this._listContainer.nativeElement).gap, 10);

        while (availableSpace < 0 && items.length > 0) {
            const item = items.pop();
            if (!item) {
                continue;
            }
            // Since we are going from the bottom to the top, we need to add item to the list as the first item of the array.
            hiddenItems.unshift(item);
            const elementWidth =
                Math.ceil(item?.marker?.elementRef.nativeElement.getBoundingClientRect().width || 0) + gap;
            availableSpace = availableSpace + elementWidth;
            item.hidden$.set(true);
        }

        this.visibleItems$.set([...items]);
        this.hiddenItems$.set([...hiddenItems]);

        this._showMoreButton$.set(hiddenItems.length > 0);
        this._cdr.detectChanges();

        this.navigation.showMoreButton$.set(this._showMoreButton);

        this._elementRef.nativeElement.classList.remove(FD_NAVIGATION_OVERFLOW_ITEM_CLASS);

        this._calculationInProgress = false;
        this._navigationService.hiddenItems$.set(this._listItems.filter((item) => item.isOverflow$()));
    }
}
