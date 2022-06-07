import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { FocusEscapeDirection, KeyboardSupportService } from '@fundamental-ngx/core/utils';
import { ListGroupHeaderDirective } from './directives/list-group-header.directive';
import { ListFocusItem } from './list-focus-item.model';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { ListNavigationItemComponent } from './list-navigation-item/list-navigation-item.component';
import { FD_LIST } from './list.tokens';

/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-list], [fdList]',
    templateUrl: `./list.component.html`,
    host: {
        class: 'fd-list',
        role: 'list'
    },
    styleUrls: ['./list.component.scss', '../utils/drag-and-drop/drag-and-drop.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [KeyboardSupportService, { provide: FD_LIST, useExisting: ListComponent }]
})
export class ListComponent implements OnInit, AfterContentInit, OnDestroy {
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

    /** Whether compact mode is included to component */
    @Input()
    @HostBinding('class.fd-list--compact')
    compact?: boolean;

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

    /** Event thrown, when focus escapes the list */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();

    /** Whether list component includes links */
    @HostBinding('class.fd-list--navigation')
    hasNavigation = false;

    /** @hidden */
    @ContentChildren(ListItemComponent)
    items: QueryList<ListItemComponent>;

    /** @hidden */
    @ContentChildren(ListNavigationItemComponent)
    _navItems: QueryList<ListNavigationItemComponent>;

    /** @hidden */
    @ContentChildren(ListFocusItem)
    private _focusItems: QueryList<ListFocusItem>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _keyboardSupportService: KeyboardSupportService<ListFocusItem>,
        private _cdr: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._cdr.detectChanges();
                })
            );
        }
        this._listenOnListFocusEscape();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._keyboardSupportService.setKeyboardService(this._focusItems, false);
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.keyboardSupport) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number, updateOnly = false): void {
        if (updateOnly) {
            this._keyboardSupportService.keyManager.updateActiveItem(index);
        } else {
            this._keyboardSupportService.keyManager.setActiveItem(index);
        }
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        this._focusItems.changes.pipe(startWith(0), takeUntil(this._onDestroy$)).subscribe(() => {
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
        const completion$ = merge(this._onRefresh$, this._onDestroy$);
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
    }

    /** @hidden */
    private _listenOnListFocusEscape(): void {
        this._keyboardSupportService.focusEscapeList
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((direction) => this.focusEscapeList.emit(direction));
    }
}
