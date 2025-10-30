import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    Signal,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { CssClassBuilder, KeyUtil, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { Subject, map, of } from 'rxjs';
import { NavigationListDataSourceDirective } from '../../directives/navigation-list-data-source.directive';
import {
    NavigationListItemDirective,
    NavigationListItemRefDirective
} from '../../directives/navigation-list-item-ref.directive';
import { NavigationDataSourceItem } from '../../models/navigation-data-source-item.model';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { FdbNavigationState, FdbNavigationType } from '../../models/navigation.types';
import { NavigationService } from '../../services/navigation.service';
import { NavigationContentEndComponent } from '../navigation-end/navigation-content-end.component';
import { NavigationContentStartComponent } from '../navigation-start/navigation-content-start.component';

interface GroupedDataSourceItems {
    start: NavigationDataSourceItem[];
    end: NavigationDataSourceItem[];
}

@Component({
    selector: 'fdb-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NavigationService,
        {
            provide: FdbNavigation,
            useExisting: NavigationComponent
        }
    ],
    host: {
        role: 'navigation'
    },
    imports: [
        NgTemplateOutlet,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationListItemDirective
    ]
})
export class NavigationComponent
    extends FdbNavigation
    implements CssClassBuilder, OnChanges, OnInit, AfterViewInit, OnDestroy
{
    /** @hidden */
    @Input()
    class: string;

    /**
     * Navigation mode.
     */
    @Input()
    mode: FdbViewMode = '';

    /**
     * Navigation state.
     */
    @Input()
    set state(value: FdbNavigationState) {
        this.state$.set(value);
    }
    get state(): FdbNavigationState {
        return this.state$();
    }

    /**
     * Navigation type.
     */
    @Input()
    type: FdbNavigationType = 'vertical';

    /** @hidden */
    @ContentChild(NavigationListItemRefDirective)
    set _navigationItemRef(value: Nullable<NavigationListItemRefDirective>) {
        this._navigationItemRenderer.set(value || null);
    }

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: true })
    private readonly _navigationItems: QueryList<FdbNavigationListItem>;

    /**
     * State signal.
     */
    readonly state$ = signal<FdbNavigationState>('expanded');

    /**
     * Whether the navigation is in snapped mode.
     */
    readonly isSnapped$ = computed(() => this.state$() === 'snapped');

    /**
     * Whether to show "More" button. Applicable for `snapped` state only.
     */
    readonly showMoreButton$ = signal<Nullable<FdbNavigationListItem>>(null);

    /**
     * Signal for navigation classList.
     * Used by popover-based submenus.
     */
    readonly classList$ = signal<string[]>([]);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    readonly dataSourceItems: Signal<GroupedDataSourceItems | undefined>;

    /** @hidden */
    readonly _navigationItemRenderer = signal<NavigationListItemRefDirective | null>(null);

    /** Stream notifies to close all popups in child list items. */
    readonly closeAllPopups = new Subject<void>();

    /** @hidden */
    private readonly _viewInitiated$ = signal(false);

    /**
     * @hidden
     * Data source directive.
     */
    private readonly _dataSourceDirective = inject(NavigationListDataSourceDirective, {
        optional: true,
        self: true
    });

    /** @hidden */
    private _keyManager: FocusKeyManager<FdbNavigationListItem>;

    /** @hidden */
    constructor() {
        super();

        this.dataSourceItems = toSignal(
            !this._dataSourceDirective
                ? of({ start: [], end: [] } as GroupedDataSourceItems)
                : this._dataSourceDirective.dataChanged$.asObservable().pipe(
                      map((data) => {
                          const groupedItems: GroupedDataSourceItems = data.reduce(
                              (acc, item) => {
                                  acc[item.placement].push(item);
                                  return acc;
                              },
                              { start: [], end: [] } as GroupedDataSourceItems
                          );
                          return groupedItems;
                      })
                  )
        );
        // When show more button is shown, reset items list with added "More button".
        effect(() => {
            if (this._viewInitiated$()) {
                this._resetItemsList(this.showMoreButton$());
            }
        });
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        this.classList$.set(
            [
                this.class,
                'fd-navigation',
                this.mode === '' ? 'fd-navigation--compact' : '',
                `fd-navigation--${this.state}`
            ].filter((k) => !!k)
        );
        return [...this.classList$(), `fd-navigation--${this.type}`];
    }

    /**
     * @hidden
     * Main keyboard navigation handler.
     */
    @HostListener('keydown', ['$event'])
    private _keyDownHandler(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            return;
        }

        event.preventDefault();

        this._keyManager.onKeydown(event);
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._dataSourceDirective?.dataSourceProvider?.match();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyManager = new FocusKeyManager(this._navigationItems)
            .withVerticalOrientation()
            .skipPredicate((item) => !item.isVisible$() || item.skipNavigation || item.disabled);
        this._keyManager.setActiveItem(0);
        this._viewInitiated$.set(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._keyManager?.destroy();
    }

    /**
     * Returns currently focused list item.
     */
    getActiveItem(): FdbNavigationListItem | null {
        return this._keyManager.activeItem;
    }

    /**
     * Sets focused item.
     */
    setActiveItem(item: FdbNavigationListItem): void {
        this._keyManager.setActiveItem(item);
    }

    /** Notifies child list items that all popups should be closed. */
    closePopups(): void {
        this.closeAllPopups.next();
    }

    /**
     * Updates the list of items.
     * Optionally inserts "More" button if overflow menu should be rendered.
     * @param showMoreButton Whether to add "More" button.
     */
    private _resetItemsList(showMoreButton: Nullable<FdbNavigationListItem>): void {
        const items = [...this._navigationItems.toArray()];
        const showMoreButtonIndex = items.findIndex((item) => item.type === 'showMore');
        if (!showMoreButton) {
            if (showMoreButtonIndex === -1) {
                return;
            }

            items.splice(showMoreButtonIndex, 1);

            this._navigationItems.reset(items);
        } else {
            if (showMoreButtonIndex > -1) {
                return;
            }

            // Find last list item from the `Start` container.
            const insertionIndex = items.findIndex((item) => {
                const listItems = item.placementContainer?.listItems$();
                if (!listItems) {
                    return;
                }

                return item.placementContainer?.placement === 'start' && listItems[listItems.length - 1] === item;
            });

            if (insertionIndex === -1) {
                return;
            }

            items.splice(insertionIndex, 0, showMoreButton);
            this._navigationItems.reset(items);
        }
    }
}
