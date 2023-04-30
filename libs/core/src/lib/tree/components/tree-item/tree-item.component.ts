import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DataSource, DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import {
    DestroyedService,
    FDK_SELECTABLE_ITEM_PROVIDER,
    Nullable,
    SelectableItemDirective,
    SelectableItemToken,
    uuidv4
} from '@fundamental-ngx/cdk/utils';
import {
    asyncScheduler,
    distinctUntilChanged,
    filter,
    observeOn,
    startWith,
    Subject,
    switchMap,
    takeUntil
} from 'rxjs';
import { FdTreeAcceptableDataSource, FdTreeDataSource } from '../../data-source/tree-data-source';
import { TreeItem, TreeItemState } from '../../models/tree-item';
import { TreeService, SelectionModeModel } from '../../tree.service';
import { BaseTreeItem } from '../../models/base-tree-item.class';

@Component({
    selector: 'fd-tree-item',
    templateUrl: './tree-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [DataSourceDirective],
    host: {
        role: 'treeitem',
        class: 'fd-tree__item'
    },
    providers: [
        DestroyedService,
        {
            provide: FDK_SELECTABLE_ITEM_PROVIDER,
            useExisting: TreeItemComponent
        },
        {
            provide: BaseTreeItem,
            useExisting: TreeItemComponent
        }
    ]
})
export class TreeItemComponent<T extends TreeItem = TreeItem, P = any>
    extends BaseTreeItem<T, P>
    implements Partial<SelectableItemToken<HTMLElement, P>>, OnInit, AfterViewInit, OnDestroy
{
    /**
     * Tree item value.
     */
    @Input()
    value: P;
    /**
     * Tree item ID.
     */
    @Input()
    id = uuidv4();

    /**
     * Tree item parent ID.
     */
    @Input()
    set parentId(value: Nullable<string>) {
        this._parentId = value;
    }

    get parentId(): Nullable<string> {
        return this._parentId || this._parentTreeItem?.id;
    }

    /** @hidden */
    private _parentId: Nullable<string>;

    /**
     * Whether the tree item is navigatable.
     */
    @Input()
    navigatable = false;

    /**
     * Whether the tree item should have a navigation indicator.
     */
    @Input()
    navigationIndicator = false;

    /**
     * Tree item state.
     */
    @Input()
    state: Nullable<TreeItemState>;

    /**
     * Tree item child nodes data source.
     */
    @Input()
    childNodes: FdTreeAcceptableDataSource<T> = [];

    /**
     * Whether to wrap content.
     */
    @Input()
    wrapContent = false;

    /**
     * Tree item level.
     */
    @Input()
    @HostBinding('attr.aria-level')
    set level(value: number) {
        this._level = value;
    }

    get level(): number {
        return this._level || (this._parentTreeItem !== null ? this._parentTreeItem.level + 1 : 1);
    }

    /** @hidden */
    private _level: number;

    /**
     * Whether the tree item is expanded.
     */
    @Input()
    set expanded(value: boolean) {
        if (value === this._expanded) {
            return;
        }

        this._expanded = value;
        this._expandedItemService.addExpandableItem(this.id, this.level, this.expanded);
        this._cdr.detectChanges();
    }

    get expanded(): boolean {
        return this._expanded;
    }

    /** @hidden */
    private _expanded = false;

    /**
     * Event emitted when user clicks on tree item.
     */
    @Output()
    readonly treeItemClick = new EventEmitter<MouseEvent | KeyboardEvent>();

    /**
     * Event emitted when `expanded` state changes.
     */
    @Output()
    expandedChange = new EventEmitter<boolean>();

    /**
     * @hidden
     * Selection state.
     */
    _selectionState = false;

    /** @hidden */
    children: T[] = [];

    /** @hidden */
    _childrenLoaded = false;

    /** @hidden */
    _selectionModel: Nullable<SelectionModeModel>;

    /** Whether the tree item has any type of child nodes. */
    get hasChildren(): boolean {
        return !!this.childNodes || this.hasProjectedChildren;
    }

    /** Whether the tree item has content-projected child nodes. */
    get hasProjectedChildren(): boolean {
        return this._projectedTreeItems && this._projectedTreeItems.length > 0;
    }

    /** Tree item focusable container. */
    @ViewChild('itemContainer', { read: ElementRef })
    itemContainer: Nullable<ElementRef<HTMLElement>>;

    /** Selectable item. */
    @ViewChild(SelectableItemDirective)
    selectableListItem: SelectableItemToken;

    /** @hidden */
    @ContentChildren(BaseTreeItem)
    _projectedTreeItems: QueryList<BaseTreeItem>;

    /** Whether the item is accessible via keyboard. */
    get keyboardAccessible(): boolean {
        return this._parentTreeItem === null ? true : this._parentTreeItem.expanded;
    }

    /** @hidden */
    private readonly _clicked$ = new Subject<MouseEvent | KeyboardEvent>();

    /** Clicked behaviour implementation. */
    clicked = this._clicked$.asObservable();

    /** @hidden */
    private readonly _expandedItemService = inject(TreeService);

    /** @hidden */
    private readonly _dataSourceDirective = inject<DataSourceDirective<T, FdTreeDataSource<T>>>(DataSourceDirective);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _parentTreeItem = inject(TreeItemComponent, {
        optional: true,
        skipSelf: true
    });

    /** @hidden */
    ngOnInit(): void {
        this._expandedItemService.selectionMode.pipe(takeUntil(this._destroy$)).subscribe((model) => {
            this._selectionModel = model;
            this._cdr.detectChanges();
        });

        this._dataSourceDirective.dataSource = this.childNodes as DataSource;
        this._expandedItemService.addExpandableItem(this.id, this.level, this.expanded);

        this._dataSourceDirective.dataSourceProvider?.dataReceived
            .pipe(
                filter((received) => received),
                switchMap(() => this._dataSourceDirective.dataChanged$.pipe(observeOn(asyncScheduler)))
            )
            .subscribe((data) => {
                this._childrenLoaded = true;
                this.children = this._expandedItemService.normalizeTreeItems(data, this.id, this.level + 1) as T[];
                this._expandedItemService.detectChanges.next();
                this._cdr.detectChanges();
            });

        this._dataSourceDirective.dataSourceProvider?.match();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._projectedTreeItems.changes
            .pipe(startWith(null), distinctUntilChanged(), takeUntil(this._destroy$))
            .subscribe(() => {
                this._cdr.detectChanges();
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._expandedItemService.removeExpandableItem(this.id, this.level!);
    }

    /** @hidden */
    focus(): void {
        this.itemContainer?.nativeElement.focus();
    }

    /** @hidden */
    _toggleExpandState(event: MouseEvent): void {
        // Do not bubble up to selection change event.
        event.stopImmediatePropagation();
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
        this.focus();
    }

    /** @hidden */
    _onClick(event: MouseEvent | KeyboardEvent): void {
        event.stopImmediatePropagation();

        this._clicked$.next(event);
        this.treeItemClick.emit(event);
    }

    /** @hidden */
    _setSelected(selected: boolean): void {
        this._selectionState = selected;
    }
}
