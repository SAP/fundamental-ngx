import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    DestroyRef,
    Directive,
    EventEmitter,
    Input,
    Output,
    Signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    inject,
    input,
    signal
} from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { HeadingLevel } from '@fundamental-ngx/core/shared';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarLabelDirective,
    ToolbarSeparatorComponent,
    ToolbarSpacerDirective
} from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SearchFieldComponent, SearchInput, SuggestionItem } from '@fundamental-ngx/platform/search-field';
import { Table, TableService } from '@fundamental-ngx/platform/table-helpers';
import { TABLE_TOOLBAR, TableToolbarInterface } from './table-toolbar';
import { TableToolbarActionsComponent } from './table-toolbar-actions.component';
import { TableToolbarLeftActionsComponent } from './table-toolbar-left-actions.component';

export interface TableAppliedFilter {
    columnName: string;
    params: string;
}

export interface ToolbarContext {
    counter: Signal<number>;
    sortable: Signal<boolean>;
    filterable: Signal<boolean>;
    groupable: Signal<boolean>;
    columns: Signal<boolean>;
    settings: Signal<boolean>;
    hasAnyActions: Signal<boolean>;
    appliedFilters: Signal<TableAppliedFilter[]>;
}

/** Context provided to the titleTemplate. */
export interface TableToolbarTitleTemplateContext {
    /** Item count signal. */
    counter: Signal<number>;
}

export type EditMode = 'none' | 'inline';

let tableToolbarTitleUniqueId = 0;

@Directive({
    selector: '[fdpTableToolbarTemplate]',
    standalone: true
})
export class TableToolbarTemplateDirective {
    /** @hidden */
    readonly templateRef = inject<TemplateRef<ToolbarContext>>(TemplateRef);

    /** @hidden */
    static ngTemplateContextGuard(
        _directive: TableToolbarTemplateDirective,
        context: unknown
    ): context is ToolbarContext {
        return true;
    }
}

/**
 * The component that represents a table toolbar.
 *
 * ```html
 * <fdp-table-toolbar
 *   title="Order Line Items"
 *   [hideItemCount]="false">
 * </fdp-table-toolbar>
 * ```
 * */

@Component({
    selector: 'fdp-table-toolbar',
    templateUrl: './table-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: TABLE_TOOLBAR, useExisting: TableToolbarComponent }],
    imports: [
        ToolbarComponent,
        ToolbarItemDirective,
        ToolbarSeparatorComponent,
        NgTemplateOutlet,
        ToolbarSpacerDirective,
        SearchFieldComponent,
        ButtonComponent,
        AsyncPipe,
        FdTranslatePipe,
        TableToolbarTemplateDirective,
        ToolbarLabelDirective,
        ContentDensityDirective,
        TitleComponent
    ]
})
export class TableToolbarComponent implements TableToolbarInterface, AfterViewChecked {
    /**
     * Whether the toolbar should hide elements in popover when they overflow.
     * */
    @Input()
    shouldOverflow = true;

    /** Table title. */
    @Input()
    title: string;

    /** Aria label for the search field. */
    @Input()
    searchFieldAriaLabel: Nullable<string>;

    /** Toggle to show table item count. */
    @Input()
    hideItemCount = false;

    /** Toggle to show search input. */
    @Input()
    hideSearchInput = false;

    /** Set a customized placeholder */
    @Input()
    searchFieldPlaceholder: string;

    /** Toggle to expand and collapse all feature */
    @Input()
    showExpandCollapseButtons = false;
    /** Suggestions for search field. */
    @Input()
    searchSuggestions: SuggestionItem[] = [];

    /** Table rows edit/add mode. */
    @Input()
    editMode: EditMode = 'none';

    /** Whether display Refresh button in the search field */
    @Input()
    disableRefresh = false;

    /** Whether display search button in the search field */
    @Input()
    disableSearch = false;

    /** Search field input text. */
    @Input()
    set searchFieldInputText(text: string) {
        this._searchInputText = text;
        this.submitSearch({ text, category: null });
    }
    get searchFieldInputText(): string {
        return this._searchInputText;
    }

    /** Event emitted when the search field input is changed. */
    @Output()
    searchFieldInputChange = new EventEmitter<string>();

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    @ContentChild(TableToolbarLeftActionsComponent)
    _tableToolbarLeftActionsComponent: TableToolbarLeftActionsComponent;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    tableToolbarTitleId: string = 'fd-table-toolbar-title-' + tableToolbarTitleUniqueId++;

    /** @hidden */
    _showSaveButton = false;

    /** @hidden */
    _searchInputText = '';

    /**
     * Custom title template. When provided, it replaces the default string title.
     * The template context provides a `counter` signal with the current item count.
     *
     * ```html
     * <fdp-table-toolbar [titleTemplate]="customTitleTpl">
     *   <ng-template #customTitleTpl let-counter="counter">
     *     <fd-icon glyph="product"></fd-icon> Products ({{ counter() }})
     *   </ng-template>
     * </fdp-table-toolbar>
     * ```
     */
    titleTemplate = input<TemplateRef<TableToolbarTitleTemplateContext> | null>(null);

    /**
     * Heading level of the table toolbar title.
     */
    headingLevel = input<HeadingLevel>(2);

    /** @hidden */
    readonly headingLevelParsed = computed(() => {
        const level = this.headingLevel();
        if (typeof level === 'number') {
            return level;
        } else if (typeof level === 'string') {
            return Number.parseInt(level.replace(/\D/g, ''), 10);
        }
        return 2;
    });

    /** @hidden */
    readonly tableLoading$: Observable<boolean> = inject(TableService).tableLoading$;

    /** @hidden Title text extracted from titleTemplate for accessibility. */
    protected readonly titleText = signal<string>('');

    /** @hidden */
    private _titleObserver: MutationObserver | undefined;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        private _tableService: TableService,
        private readonly _table: Table
    ) {
        this._listenToTableEvents();
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        // Set up observer once the element exists in the DOM
        if (!this._titleObserver) {
            this._setupTitleObserver();
        }
    }

    /** @hidden */
    submitSearch(search: SearchInput): void {
        this._table.search(search);
    }

    /** @hidden */
    searchInputChanged(event: SearchInput): void {
        this.searchFieldInputChange.emit(event.text);
    }

    /** @hidden */
    openSorting(): void {
        this._table.openTableSortSettings.emit();
    }

    /** @hidden */
    openFiltering(): void {
        this._table.openTableFilterSettings.emit();
    }

    /** @hidden */
    openGrouping(): void {
        this._table.openTableGroupSettings.emit();
    }

    /** @hidden */
    openColumns(): void {
        this._table.openTableColumnSettings.emit();
    }

    /** @hidden */
    _addRow(): void {
        this._table.addRow();
    }

    /** @hidden */
    _saveRows(): void {
        this._table.saveRows();
    }

    /** @hidden */
    _cancelEditing(): void {
        this._table.cancelEditing();
    }

    /** @hidden */
    _expandAll(): void {
        this._table.expandAll();
    }

    /** @hidden */
    _formatAppliedFilters(appliedFilters: { columnName: string; params: string }[]): string {
        return appliedFilters
            .map((filter, index) => {
                const separator = index < appliedFilters.length - 1 ? ', ' : '';
                return `${filter.columnName} (${filter.params})${separator}`;
            })
            .join('');
    }

    /** @hidden */
    _closeFilterToolbar(): void {
        this._tableService.resetFilters();
    }

    /** @hidden */
    _collapseAll(): void {
        this._table.collapseAll();
    }

    /** @hidden */
    private _listenToTableEvents(): void {
        this._table.emptyRowAdded.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._showSaveButton = true;
        });

        this._table.save.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._showSaveButton = false;
        });

        this._table.cancel.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._showSaveButton = false;
        });

        this._table.presetChanged.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((state) => {
            this._searchInputText = state.searchInput?.text ?? '';
        });
    }

    /** @hidden Sets up a MutationObserver to watch for title content changes. */
    private _setupTitleObserver(): void {
        const titleElement = document.getElementById(this.tableToolbarTitleId);
        if (titleElement) {
            this._updateTitleText(titleElement);
            this._titleObserver = new MutationObserver(() => this._updateTitleText(titleElement));
            this._titleObserver.observe(titleElement, {
                childList: true,
                subtree: true,
                characterData: true
            });
            this._destroyRef.onDestroy(() => this._titleObserver?.disconnect());
        }
    }

    /** @hidden Updates the title text from the rendered title element. */
    private _updateTitleText(titleElement: HTMLElement): void {
        const text = titleElement.textContent?.trim() || '';
        if (text !== this.titleText()) {
            this.titleText.set(text);
        }
    }
}
