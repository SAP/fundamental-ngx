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
import { distinctUntilChanged, filter, startWith, Subject, switchMap, takeUntil } from 'rxjs';
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
        class: 'fd-tree__item',
        role: 'presentation'
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
     * Tree item aria label.
     */
    @HostBinding('attr.aria-label')
    @Input()
    ariaLabel: string;

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
        this._treeService.addExpandableItem(this.id, this.level, value);
        this._expanded = value;

        if (value) {
            setTimeout(() => {
                this._treeService.detectChanges.next();
                this._dataSourceDirective.dataSourceProvider?.match();
            });
        } else {
            this.children = [];
            this.childrenLoaded = false;
            this._treeService.detectChanges.next();
        }

        this._cdr.detectChanges();
    }

    get expanded(): boolean {
        return this._expanded;
    }

    /** @hidden */
    private _expanded = false;

    /**
     * @hidden
     * Whether the tree item should have a navigation indicator.
     */
    _navigationIndicator = false;

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
    childrenLoaded = false;

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

    /** Whether the tree item has data source children. */
    get hasDsChildren(): boolean {
        return this._dsChildrenNumber > 0;
    }

    /** @Hidden */
    _containerTabIndex = 0;

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
        return this._parentTreeItem === null
            ? true
            : this._parentTreeItem.keyboardAccessible && this._parentTreeItem.expanded;
    }

    /** @hidden */
    _setSize: number;
    /** @hidden */
    _currentPosition: number;

    /** @hidden */
    _totalChildrenLoaded = false;

    /** @hidden */
    private _dsChildrenNumber = 0;

    /** @hidden */
    private readonly _clicked$ = new Subject<MouseEvent | KeyboardEvent>();

    /** Clicked behavior implementation. */
    clicked = this._clicked$.asObservable();

    /** @hidden */
    private readonly _treeService = inject(TreeService);

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
        this._treeService.selectionMode.pipe(takeUntil(this._destroy$)).subscribe((model) => {
            this._selectionModel = model;
            this._cdr.detectChanges();
        });

        this._treeService.navigationIndicator.pipe(takeUntil(this._destroy$)).subscribe((value) => {
            this._navigationIndicator = value;
            this._cdr.detectChanges();
        });

        this._dataSourceDirective.dataSource = this.childNodes as DataSource;
        this._treeService.addExpandableItem(this.id, this.level, this.expanded);

        this._dataSourceDirective.dataSourceProvider
            ?.getTotalItems()
            .pipe(takeUntil(this._destroy$))
            .subscribe((totalItems) => {
                this._dsChildrenNumber = totalItems;
                this._totalChildrenLoaded = true;
                this._cdr.detectChanges();
            });

        this._dataSourceDirective.dataSourceProvider?.dataReceived
            .pipe(
                filter((received) => received),
                switchMap(() => this._dataSourceDirective.dataChanged$),
                takeUntil(this._destroy$)
            )
            .subscribe((data) => {
                this.children = this._treeService.normalizeTreeItems(data, this.id, this.level + 1) as T[];
                this.childrenLoaded = true;
                setTimeout(() => {
                    this._treeService.detectChanges.next();
                    this._cdr.detectChanges();
                });
            });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._projectedTreeItems.changes
            .pipe(startWith(null), distinctUntilChanged(), takeUntil(this._destroy$))
            .subscribe(() => {
                this._cdr.detectChanges();
                this._projectedTreeItems.forEach((treeItem, index) => {
                    treeItem.setPosition(this._projectedTreeItems.length, index + 1);
                });
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._treeService.removeExpandableItem(this.id, this.level!);
    }

    /**
     * Sets position of the current item in the set.
     * @param totalItems Total items amount in the set.
     * @param currentIndex Current item position in the set.
     */
    setPosition(totalItems: number, currentIndex: number): void {
        this._setSize = totalItems;
        this._currentPosition = currentIndex;
    }

    /** Method to focus on the tree item. */
    focus(): void {
        this.itemContainer?.nativeElement.focus();
    }

    /** Method for setting the focusable tabindex. */
    setContainerTabIndex(value: number): void {
        this._containerTabIndex = value;
        this._cdr.markForCheck();
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
