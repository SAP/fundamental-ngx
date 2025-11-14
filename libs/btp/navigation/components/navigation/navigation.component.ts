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
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    inject,
    signal
} from '@angular/core';
import { FdbViewMode } from '@fundamental-ngx/btp/shared';
import { CssClassBuilder, KeyUtil, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import {
    NavigationListItemDirective,
    NavigationListItemRefDirective
} from '../../directives/navigation-list-item-ref.directive';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { FdbNavigationState, FdbNavigationType } from '../../models/navigation.types';
import { NavigationService } from '../../services/navigation.service';
import { NavigationContentEndComponent } from '../navigation-end/navigation-content-end.component';
import { NavigationContentStartComponent } from '../navigation-start/navigation-content-start.component';

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
        NavigationListItemDirective,
        NavigationContentStartComponent,
        NavigationContentEndComponent
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
     * aria-label for the navigation.
     */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string> = null;

    /**
     * aria-roledescription for the navigation.
     */
    @Input()
    @HostBinding('attr.aria-roledescription')
    ariaRoleDescription: Nullable<string> = null;

    /**
     * Navigation mode.
     */
    @Input()
    mode: FdbViewMode = '';

    /**
     * Navigation mode.
     */
    @Input({ transform: booleanAttribute })
    isOverlay = false;

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

    /**
     * Selection mode for navigation items.
     * - 'router': Selection is handled by router link activation (default)
     * - 'click': Selection is handled by click events
     */
    @Input()
    selectionMode: 'router' | 'click' = 'router';

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

    /** Navigation service for managing selection state. */
    readonly service = inject(NavigationService);

    /** @hidden */
    readonly _navigationItemRenderer = signal<NavigationListItemRefDirective | null>(null);

    /** Stream notifies to close all popups in child list items. */
    readonly closeAllPopups = new Subject<void>();

    /** @hidden */
    private readonly _viewInitiated$ = signal(false);

    /** @hidden */
    private _keyManager: FocusKeyManager<FdbNavigationListItem>;

    /** @hidden */
    constructor() {
        super();
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
                `fd-navigation--${this.state}`,
                this.isOverlay && this.state === 'expanded' ? 'is-overlay' : ''
            ].filter((k) => !!k)
        );
        return [...this.classList$(), `fd-navigation--${this.type}`];
    }

    /**
     * @hidden
     * Main keyboard navigation handler.
     */
    @HostListener('keydown', ['$event'])
    _keyDownHandler(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            return;
        }

        event.preventDefault();

        this._keyManager.onKeydown(event);
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyManager = new FocusKeyManager(this._navigationItems)
            .withVerticalOrientation()
            .skipPredicate((item) => !item.isVisible$() || item.skipNavigation);
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
     * Get the currently selected item when in click selection mode.
     * @returns The currently selected item, or null if none is selected.
     */
    getSelectedItem(): FdbNavigationListItem | null {
        return this.service.getSelectedItem();
    }

    /**
     * Set the selected item when in click selection mode.
     * @param item The item to select, or null to clear selection.
     */
    setSelectedItem(item: FdbNavigationListItem | null): void {
        this.service.setSelectedItem(item);
    }

    /**
     * Clear the current selection when in click selection mode.
     */
    clearSelection(): void {
        this.service.setSelectedItem(null);
    }

    /**
     * Get a navigation item by its ID.
     * @param id The ID of the navigation item to find.
     * @returns The navigation item with the specified ID, or null if not found.
     */
    getNavigationItemById(id: string): FdbNavigationListItem | null {
        const items = this._navigationItems.toArray();
        return this._findItemById(items, id);
    }

    /**
     * Set the selected item by its ID when in click selection mode.
     * @param id The ID of the navigation item to select.
     * @returns True if the item was found and selected, false otherwise.
     */
    setSelectedItemById(id: string): boolean {
        const item = this.getNavigationItemById(id);
        if (item) {
            this.setSelectedItem(item);
            return true;
        }
        return false;
    }

    /**
     * Helper method to find an item by ID recursively through the navigation tree.
     * @param items Array of navigation items to search through.
     * @param id The ID to search for.
     * @returns The found item or null.
     */
    private _findItemById(items: FdbNavigationListItem[], id: string): FdbNavigationListItem | null {
        for (const item of items) {
            // Check if current item matches
            if (item.id() === id) {
                return item;
            }

            // Recursively search in child items
            if (item.listItems$().length > 0) {
                const childItems = item.listItems$().filter((child): child is FdbNavigationListItem => child !== null);
                const found = this._findItemById(childItems, id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
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
