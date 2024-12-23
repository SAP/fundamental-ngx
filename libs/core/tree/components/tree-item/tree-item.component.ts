import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    inject,
    input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DataSource, DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import {
    ClickedDirective,
    FDK_SELECTABLE_ITEM_PROVIDER,
    HasElementRef,
    Nullable,
    SelectableItemDirective,
    SelectableItemToken,
    uuidv4
} from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Observable, Subject, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs';
import { FdTreeAcceptableDataSource, FdTreeDataSource } from '../../data-source/tree-data-source';
import { TreeItemDirective } from '../../directives/tree-item.directive';
import { BaseTreeItem } from '../../models/base-tree-item.class';
import { TreeItem, TreeItemState } from '../../models/tree-item';
import { TreeService } from '../../tree.service';

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
        {
            provide: FDK_SELECTABLE_ITEM_PROVIDER,
            useExisting: TreeItemComponent
        },
        {
            provide: BaseTreeItem,
            useExisting: TreeItemComponent
        }
    ],
    imports: [
        SelectableItemDirective,
        NgClass,
        NgStyle,
        ClickedDirective,
        NgTemplateOutlet,
        IconComponent,
        SkeletonComponent,
        CheckboxComponent,
        FormsModule,
        RadioButtonComponent,
        FdTranslatePipe
    ]
})
export class TreeItemComponent<T extends TreeItem = TreeItem, P = any>
    extends BaseTreeItem<T, P>
    implements Partial<SelectableItemToken<HTMLElement, P>>, OnInit, AfterViewInit, OnDestroy, HasElementRef
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

    /** Tree item focusable container. */
    @ViewChild('itemContainer', { read: ElementRef })
    itemContainer: Nullable<ElementRef<HTMLElement>>;

    /** Selectable item. */
    @ViewChild(SelectableItemDirective)
    selectableListItem: SelectableItemToken;

    /** @hidden */
    @ContentChildren(BaseTreeItem)
    _projectedTreeItems: QueryList<BaseTreeItem>;

    /**
     * @hidden
     * Selection state.
     */
    _selectionState = false;

    /** @hidden */
    children: T[] = [];

    /** @hidden */
    childrenLoaded = false;

    /** @Hidden */
    _containerTabIndex = 0;

    /** @hidden */
    _setSize: number;
    /** @hidden */
    _currentPosition: number;

    /** @hidden */
    _totalChildrenLoaded = false;

    /** Clicked behavior implementation. */
    clicked: Observable<MouseEvent | KeyboardEvent>;

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    readonly _treeService = inject(TreeService);

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
    /** Whether the item is accessible via keyboard. */
    get keyboardAccessible(): boolean {
        return this._parentTreeItem === null
            ? true
            : this._parentTreeItem.keyboardAccessible && this._parentTreeItem.expanded;
    }

    /**
     * Custom background color
     */
    backgroundColor = input<string>();

    /**
     * Custom styles
     */
    customStyles = input<object>();

    /** @hidden */
    private _parentId: Nullable<string>;

    /** @hidden */
    private _level: number;

    /** @hidden */
    private _expanded = false;
    /** @hidden */
    private _dsChildrenNumber = 0;

    /** @hidden */
    private readonly _clicked$ = new Subject<MouseEvent | KeyboardEvent>();

    /** @hidden */
    private readonly _treeItemDir = inject<TreeItemDirective<T, P>>(TreeItemDirective, {
        optional: true
    });

    /** @hidden */
    private readonly _dataSourceDirective = inject<DataSourceDirective<T, FdTreeDataSource<T>>>(DataSourceDirective);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _parentTreeItem = inject(TreeItemComponent, {
        optional: true,
        skipSelf: true
    });

    /** @hidden */
    constructor() {
        super();
        this._treeItemDir?.setTreeItem(this);
        this.clicked = this._clicked$.asObservable();
    }

    /** @hidden */
    ngOnInit(): void {
        this._dataSourceDirective.dataSource = this.childNodes as DataSource<T, FdTreeDataSource<T>>;
        this._treeService.addExpandableItem(this.id, this.level, this.expanded);

        this._dataSourceDirective.dataSourceProvider
            ?.getTotalItems()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((totalItems) => {
                this._dsChildrenNumber = totalItems;
                this._totalChildrenLoaded = true;
                this._cdr.detectChanges();
            });

        this._dataSourceDirective.dataSourceProvider?.dataReceived
            .pipe(
                filter((received) => received),
                switchMap(() => this._dataSourceDirective.dataChanged$),
                takeUntilDestroyed(this._destroyRef)
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
            .pipe(startWith(null), distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
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
