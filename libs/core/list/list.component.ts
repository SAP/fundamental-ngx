import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FocusEscapeDirection,
    KeyboardSupportService,
    LIST_ITEM_COMPONENT,
    ListItemInterface,
    Nullable,
    destroyObservable
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Observable, Subject, merge } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ListGroupHeaderDirective } from './directives/list-group-header.directive';
import { ListComponentInterface } from './list-component.interface';
import { ListFocusItem } from './list-focus-item.model';
import { ListItemComponent } from './list-item/list-item.component';
import { ListNavigationItemComponent } from './list-navigation-item/list-navigation-item.component';
import { ListUnreadIndicator } from './list-unread-indicator.interface';
import { FD_LIST_COMPONENT, FD_LIST_UNREAD_INDICATOR } from './tokens';

/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-list], [fdList]',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-list',
        '[class.fd-settings__list]': 'settingsList() || settingsListFooter()',
        '[class.fd-settings__list--footer]': 'settingsListFooter()'
    },
    styleUrls: ['./list.component.scss', '../../cdk/utils/drag-and-drop/drag-and-drop.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        KeyboardSupportService,
        contentDensityObserverProviders(),
        {
            provide: FD_LIST_COMPONENT,
            useExisting: ListComponent
        },
        {
            provide: FD_LIST_UNREAD_INDICATOR,
            useExisting: ListComponent
        }
    ],
    standalone: true
})
export class ListComponent implements ListComponentInterface, ListUnreadIndicator, OnInit, AfterContentInit, OnDestroy {
    /** Whether dropdown mode is included to component, used for Select and Combobox */
    @Input()
    @HostBinding('class.fd-list--dropdown')
    dropdownMode = false;

    /** Whether multi mode is included to component, used for MultiInput */
    @Input()
    @HostBinding('class.fd-list--multi-input')
    multiInputMode = false;

    /** Whether list is used in mobile mode*/
    @Input()
    @HostBinding('class.fd-list--mobile')
    mobileMode = false;

    /** Whether list component contains message */
    @Input()
    @HostBinding('class.fd-list--has-message')
    hasMessage = false;

    /** Whether list component has removed borders */
    @Input()
    @HostBinding('class.fd-list--no-border')
    noBorder = false;

    /** Whether list component has navigation indicators */
    @Input()
    @HostBinding('class.fd-list--navigation-indication')
    navigationIndicator = false;

    /** Whether list component has checkboxes or radio buttons included */
    @Input()
    @HostBinding('class.fd-list--selection')
    selection = false;

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    keyboardSupport = true;

    /** Whether list should have a byline */
    @Input()
    @HostBinding('class.fd-list--byline')
    byline = false;

    /** Whether to display unread notification indicator. */
    @HostBinding('class.fd-list--unread-indicator')
    @Input()
    unreadIndicator = false;

    /** Event thrown, when focus escapes the list */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();

    /** Whether list component includes links */
    @HostBinding('class.fd-list--navigation')
    hasNavigation = false;

    /**
     * User-provided role.
     */
    @Input()
    role: Nullable<string>;

    /** @hidden */
    @ContentChildren(LIST_ITEM_COMPONENT)
    items: QueryList<ListItemInterface>;

    /** @hidden */
    @ContentChildren(ListNavigationItemComponent)
    _navItems: QueryList<ListNavigationItemComponent>;

    /** @hidden */
    @ContentChildren(ListFocusItem)
    private _focusItems: QueryList<ListFocusItem>;

    /** @hidden */
    @HostBinding('attr.role')
    private get _ariaRole(): string {
        return this.role || this._defaultRole;
    }

    /** Whether the list is used inside Settings Dialog */
    settingsList = input(false, { transform: booleanAttribute });

    /** Whether the list is used inside Settings Dialog Footer */
    settingsListFooter = input(false, { transform: booleanAttribute });

    /**
     * @hidden
     * Default role for lists
     */
    private _defaultRole = 'list';

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        private _keyboardSupportService: KeyboardSupportService<ListFocusItem>,
        _contentDensityObserver: ContentDensityObserver
    ) {
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.keyboardSupport) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnListFocusEscape();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._keyboardSupportService.setKeyboardService(this._focusItems, false, false);
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onRefresh$.next();
        this._onRefresh$.complete();
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number, updateOnly = false): void {
        if (updateOnly) {
            this._keyboardSupportService.keyManager.updateActiveItem(index);
        } else {
            this._keyboardSupportService.keyManager.setActiveItem(index);
        }
    }

    /**
     * @returns Currently active list item.
     */
    getActiveItem(): ListFocusItem | null {
        return this._keyboardSupportService.keyManager.activeItem;
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        this._focusItems.changes.pipe(startWith(0), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._recheckLinks();
            this._listenOnItemsClick();
            setTimeout(() => {
                // using setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
                this.updateItemsProperties();
            });
        });
    }

    /** @hidden */
    private _listenOnItemsClick(): void {
        /** Finish all the streams, from before */
        this._onRefresh$.next();

        if (!this.keyboardSupport) {
            return;
        }

        /** Merge refresh/destroy observables */
        const completion$ = merge(this._onRefresh$, destroyObservable(this._destroyRef));
        const interactionChangesIndexes: Observable<{ index: number; updateOnly: boolean }>[] = this._focusItems.map(
            (item, index) =>
                merge(
                    item._clicked$.pipe(map(() => ({ index, updateOnly: false }))),
                    item._focused$.pipe(map(({ focusedWithin }) => ({ index, updateOnly: focusedWithin })))
                )
        );
        merge(...interactionChangesIndexes)
            .pipe(takeUntil(completion$))
            .subscribe(({ index, updateOnly }) => this.setItemActive(index, updateOnly));
    }

    /** @hidden */
    private updateItemsProperties(): void {
        let closestListHeader: ListGroupHeaderDirective | null = null;
        this._focusItems.forEach((item, index) => {
            if (item instanceof ListGroupHeaderDirective) {
                closestListHeader = item;
            } else if (item instanceof ListItemComponent && closestListHeader) {
                item._relatedGroupHeaderId = closestListHeader.nativeElementId;
            }
            item.setIsFirst(index === 0);
        });
    }

    /** @hidden */
    private _recheckLinks(): void {
        const items = this.items.filter((item) => item.link);
        this.hasNavigation = items.length > 0;
        if (this.selection) {
            this._defaultRole = 'listbox';
        }
    }

    /** @hidden */
    private _listenOnListFocusEscape(): void {
        this._keyboardSupportService.focusEscapeList
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((direction) => this.focusEscapeList.emit(direction));
    }
}
