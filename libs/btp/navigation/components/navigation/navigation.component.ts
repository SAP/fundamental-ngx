/* eslint-disable @angular-eslint/no-input-rename,@angular-eslint/no-host-metadata-property */
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    Signal,
    TemplateRef,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { CssClassBuilder, Nullable, RtlService, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { Subject, map, of, startWith } from 'rxjs';
import { NavigationListDataSourceDirective } from '../../directives/navigation-list-data-source.directive';
import {
    NavigationListItemDirective,
    NavigationListItemRefDirective
} from '../../directives/navigation-list-item-ref.directive';
import { NavigationMoreButtonDirective } from '../../directives/navigation-more-button.directive';
import { NavigationDataSourceItem } from '../../models/navigation-data-source-item.model';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { FdbNavigationState, FdbNavigationType } from '../../models/navigation.types';
import { NavigationService } from '../../services/navigation.service';
import { NavigationContentEndComponent } from '../navigation-end/navigation-content-end.component';
import { NavigationListItemComponent } from '../navigation-item/navigation-list-item.component';
import { NavigationContentStartComponent } from '../navigation-start/navigation-content-start.component';

interface GroupedDataSourceItems {
    start: NavigationDataSourceItem[];
    end: NavigationDataSourceItem[];
}

@Component({
    selector: 'fdb-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
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
        NavigationListItemDirective,
        NavigationContentStartComponent,
        NavigationContentEndComponent,
        NavigationListItemComponent
    ]
})
export class NavigationComponent extends FdbNavigation implements CssClassBuilder, OnChanges, OnInit, AfterViewInit {
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
    set type(value: FdbNavigationType) {
        this._type$.set(value);
    }
    get type(): FdbNavigationType {
        return this._type$();
    }

    @ContentChild(NavigationMoreButtonDirective)
    private set _moreButtonRef(value: Nullable<NavigationMoreButtonDirective>) {
        this.moreButtonRenderer$.set(value?.templateRef || null);
    }

    /** @hidden */
    @ContentChild(NavigationListItemRefDirective)
    set _navigationItemRef(value: Nullable<NavigationListItemRefDirective>) {
        this._navigationItemRenderer.set(value || null);
    }

    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: true })
    private readonly _navigationItems: QueryList<FdbNavigationListItem>;

    /** Custom "More" button renderer. */
    readonly moreButtonRenderer$ = signal<TemplateRef<any> | null>(null);

    /** Whether the navigation is norizontal. */
    readonly horizontal$ = computed(() => this._type$() === 'horizontal');

    /**
     * State signal.
     */
    readonly state$ = signal<FdbNavigationState>('expanded');

    /**
     * Whether the navigation is in snapped mode.
     */
    readonly isSnapped$ = computed(() => this.state$() === 'snapped' || this.horizontal$());

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
    private readonly _viewInited$ = signal(false);

    /** @hidden */
    private readonly _type$ = signal<FdbNavigationType>('vertical');

    /**
     * @hidden
     * Data source directive.
     */
    private readonly _dataSourceDirective = inject(NavigationListDataSourceDirective, {
        optional: true,
        self: true
    });

    /** @hidden */
    private readonly _rtl$ = toSignal(inject(RtlService, { optional: true })?.rtl || of(false));

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _navigationService = inject(NavigationService);

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
        effect(
            () => {
                if (this._viewInited$()) {
                    this._resetItemsList(this.showMoreButton$());
                }
            },
            {
                allowSignalWrites: true
            }
        );

        effect(
            () => {
                this._navigationService.horizontal$.set(this.horizontal$());
                this._navigationService.isSnapped$.set(this.isSnapped$());
            },
            {
                allowSignalWrites: true
            }
        );
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        this.classList$.set(
            [
                this.class,
                'fd-navigation',
                this.mode ? `fd-navigation--${this.mode}` : '',
                `fd-navigation--${this.state}`,
                this.horizontal$() ? `fd-navigation--${this.type}` : ''
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
        this._navigationService.onRootKeyDown(event);
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
        this._viewInited$.set(true);

        this._navigationItems.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._navigationService.allItems$.set(this._navigationItems.toArray());
        });
    }

    /**
     * Returns currently focused list item.
     */
    getActiveItem(): FdbNavigationListItem | null {
        return this._navigationService.getRootActiveItem();
    }

    /**
     * Returns first focusable list item.
     */
    getFirstFocusableItem(): FdbNavigationListItem | null {
        return this._navigationItems?.find((item) => item.isVisible$() && !item.skipNavigation) || null;
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
            this._navigationItems.notifyOnChanges();
        }
    }
}
