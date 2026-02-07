import { FocusableOption, FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    DestroyRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    inject,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Pipe,
    PipeTransform,
    QueryList,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { isObservable, merge, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
    AutoCompleteDirective,
    AutoCompleteEvent,
    ClickedDirective,
    destroyObservable,
    DynamicComponentService,
    KeyUtil,
    SearchHighlightPipe
} from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListItemComponent, ListModule } from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverComponent, PopoverModule } from '@fundamental-ngx/core/popover';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import { FD_SHELLBAR_COMPONENT, FD_SHELLBAR_SEARCH_COMPONENT, ShellbarComponent } from '@fundamental-ngx/core/shellbar';
import { TextComponent } from '@fundamental-ngx/core/text';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe, resolveTranslationSyncFn } from '@fundamental-ngx/i18n';
import { MenuComponent, MenuItemComponent, MenuTriggerDirective } from '@fundamental-ngx/platform/menu';
import { BaseComponent, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import equal from 'fast-deep-equal';
import {
    SEARCH_FIELD_COMPONENT,
    SearchFieldMobileInterface
} from './search-field-mobile/search-field-mobile.interface';
import { SearchFieldMobileComponent } from './search-field-mobile/search-field/search-field-mobile.component';

export interface SearchInput {
    text: string;
    category: string | null;
}

export interface SuggestionItem {
    value: string; // main text of the suggestion
    isHistorical?: string;
    data?: any;
    isGroupHeader?: boolean;
    children?: SuggestionItem[];
    searchInScopeText?: string;
    searchInScopeCounter?: number;
    searchInScopeCallback?: () => any;
    showMoreText?: string;
    showMoreCounter?: number;
    showMoreCallback?: () => any;
}

export interface ValueLabelItem {
    value: string;
    label: string;
}

export interface SearchResultsActionButton {
    glyph?: string;
    label?: string;
    id?: string;
    callback?: () => any;
}

@Directive({
    selector: '[fdpSearchFieldSuggestion]',
    host: {
        tabindex: '-1'
    },
    standalone: true
})
export class SearchFieldSuggestionDirective implements FocusableOption {
    /** @hidden */
    constructor(public element: ElementRef) {}

    /** @hidden */
    focus(): void {
        this.element.nativeElement.focus();
    }
}

let searchFieldIdCount = 0;

type Appearance = SearchComponent['appearance'] | undefined;

@Component({
    selector: 'fdp-search-field',
    templateUrl: './search-field.component.html',
    styleUrl: './search-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_SHELLBAR_SEARCH_COMPONENT,
            useExisting: SearchFieldComponent
        }
    ],
    imports: [
        NgTemplateOutlet,
        MenuTriggerDirective,
        MenuComponent,
        MenuItemComponent,
        SelectComponent,
        OptionComponent,
        FormsModule,
        IconComponent,
        NgClass,
        SearchFieldSuggestionDirective,
        AsyncPipe,
        SearchHighlightPipe,
        FdTranslatePipe,
        PopoverModule,
        BarModule,
        TitleComponent,
        TextComponent,
        ListModule,
        InfoLabelComponent,
        ClickedDirective,
        AvatarComponent,
        ButtonComponent,
        AutoCompleteDirective,
        BusyIndicatorComponent,
        LinkComponent,
        forwardRef(() => SuggestionMatchesPipe)
    ]
})
export class SearchFieldComponent
    extends BaseComponent
    implements OnInit, OnChanges, OnDestroy, SearchFieldMobileInterface, SearchComponent, AfterViewInit
{
    /** Type of component used to render the categories dropdown. */
    @Input()
    categoryMode: 'menu' | 'select' = 'menu';

    /** Additional appearance configuration. */
    @Input()
    set appearance(value: Appearance) {
        if (equal(value, this.appearance)) {
            return;
        }

        this._appearance = value;
        this.detectChanges();
    }

    get appearance(): Appearance {
        return this._appearance;
    }

    /** Placeholder text for search input field. */
    @Input()
    placeholder: string;

    /** Set Mobile Mode */
    @Input()
    mobile: boolean;

    /** Search Field Mobile configuration */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Whether display Refresh button */
    @Input()
    disableRefresh = false;

    /** Whether display search button */
    @Input()
    disableSearch = false;

    /** List of string values to populate suggestion dropdown selection. */
    @Input()
    set suggestions(value: SuggestionItem[] | Observable<SuggestionItem[]>) {
        this._suggestions = value;
        if (Array.isArray(value)) {
            // convert suggestions array to an observable
            this._dropdownValues$ = of(value);
        } else if (isObservable(value)) {
            this._dropdownValues$ = value;
        } else {
            this._dropdownValues$ = of([]);
        }
    }
    get suggestions(): SuggestionItem[] | Observable<SuggestionItem[]> {
        return this._suggestions;
    }

    /** Datasource for suggestion list */
    @Input()
    set dataSource(value: SearchFieldDataSource<any>) {
        if (value) {
            this._initializeDataSource(value);
        }
    }
    get dataSource(): SearchFieldDataSource<any> {
        return this._dataSource;
    }

    /** Initial input text. */
    @Input()
    inputText = '';

    /** List of categories. */
    @Input()
    set categories(value: ValueLabelItem[]) {
        this._categories = value;
        this._showCategoryDropdown = Array.isArray(value) && value.length > 0;
    }
    get categories(): ValueLabelItem[] {
        return this._categories;
    }

    /** Current category, value should be present in categories array */
    @Input()
    currentCategory: ValueLabelItem;

    /** Set label for category dropdown button. */
    @Input()
    categoryLabel = 'Category';

    /** Hide display of category label */
    @Input()
    hideCategoryLabel = false;

    /** Toggle "loading" mode. */
    @Input()
    isLoading = false;

    /** Whether to always show search button. */
    @Input()
    forceSearchButton = false;

    /** Whether to disable the "suggestions found" live announcer. */
    @Input()
    disableSuggestionsFoundAnnouncer = false;

    /** Whether to show the "All" option in the category select. */
    @Input()
    showCategoryAllOption = false;

    /** Input change event. */
    @Output()
    inputChange: EventEmitter<SearchInput> = new EventEmitter();

    /** Search submit event. */
    @Output()
    searchSubmit: EventEmitter<SearchInput> = new EventEmitter();

    /** Cancel search event. */
    @Output()
    cancelSearch: EventEmitter<SearchInput> = new EventEmitter();

    /** Open mobile mode event. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the advanced filter button is clicked. */
    @Output()
    advancedFilterButtonClick = new EventEmitter<void>();

    /** @hidden */
    @ViewChild('categoryDropdown', { static: false })
    categoryDropdown: PopoverComponent;

    /** @hidden */
    @ViewChild('categorySelectComponent', { static: false })
    categorySelectComponent: SelectComponent;

    /** @hidden */
    @ViewChild('inputGroup', { static: false })
    inputGroup: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('inputField', { static: false })
    inputField: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('inputFieldTemplate')
    inputFieldTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('suggestionMenuTemplate', { static: false })
    suggestionMenuTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('suggestionListEl', { read: ElementRef })
    suggestionListEl: ElementRef;

    /** @hidden */
    @ViewChildren(SearchFieldSuggestionDirective)
    suggestionItems: QueryList<SearchFieldSuggestionDirective>;

    /** @hidden */
    get searchFieldValue(): SearchInput {
        return {
            text: this.inputText,
            category: this._currentCategory?.value || null
        };
    }

    /** Title of the initial suggestion, if a suggestion list is displayed. */
    @Input()
    initialSuggestionTitle = '';

    /** Subline of the initial suggestion, if a suggestion list is displayed. */
    @Input()
    initialSuggestionSubline = '';

    /** Title of the initial suggestion if the user has entered some text and there are no results to display, and an initial suggestion title should be shown. */
    @Input()
    initialSuggestionEmptyTitle = '';

    /** Title of the initial suggestion if the user has entered some text and there are no results to display, and an initial suggestion subline should be shown. */
    @Input()
    initialSuggestionEmptySubline = '';

    /** Subline of the initial suggestion, if a suggestion list is displayed. */
    @Input()
    suggestionFooter: TemplateRef<any> | null = null;

    /** Template to display when the search results list has no items to display. */
    @Input()
    searchResultsEmptyTemplate: TemplateRef<any> | null = null;

    /** Options to display when the user has entered a string into the input that returns no results. */
    @Input()
    searchResultsEmptyDefaultSuggestions: SuggestionItem[] | null = null;

    /** Whether to show the advanced filter button, which emits the event `advancedFilterButtonClick`. If this input is set to true, it will override any other category button settings. */
    @Input()
    showAdvancedFilter = false;

    /** Whether to allow empty searches when using a data source, meaning all results will be displayed when the search input is empty. */
    @Input()
    allowEmptySearch = false;

    /** Whether to display a suggestion item as selected after it has been clicked. */
    @Input()
    enableSelection = false;

    /** Whether to display the busy indicator over the suggestion list. */
    @Input()
    suggestionsLoading = false;

    /** Title for the busy indicator. */
    @Input()
    busyIndicatorTitle = '';

    /** Aria value text for the busy indicator. */
    @Input()
    busyIndicatorAriaValueText = '';

    /** @hidden Focus state */
    _isFocused = false;

    /**
     * Observable list of suggestion items to populate dropdown menu.
     * @hidden
     */
    _dropdownValues$: Observable<SuggestionItem[]> = of([]);

    /**
     * Currently set category.
     * @hidden
     */
    _currentCategory?: ValueLabelItem | null;

    /**
     * Whether or not to show category dropdown. This is dependent on length of `categoryValues` property.
     * @hidden
     */
    _showCategoryDropdown = false;

    /** @hidden */
    _inputId = '';

    /** @hidden */
    _submitId = '';

    /** @hidden */
    _menuId = '';

    /** @hidden */
    _refreshId = '';

    /** @hidden */
    _clearId = '';

    /** @hidden */
    _popoverHeaderId = '';

    /** @hidden */
    _popoverBodyId = '';

    /** @hidden */
    isOpen = false;

    /** @hidden */
    _isRefresh = false;

    /** @hidden */
    _isSearchDone = false;

    /** @hidden */
    _isOpen$ = signal(false);

    /** @hidden */
    _autoCompleteSuggestions: SuggestionItem[] = [];

    /** @hidden */
    _selectedSuggestionItem: SuggestionItem | null;

    /** @hidden */
    _autoCompleteMostRecentSuggestionItem: SuggestionItem;

    /** @hidden */
    _selectedSuggestionItemId: string;

    /** @hidden */
    _categorySelectDescription: string;

    /** @hidden */
    private _suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;

    /** @hidden */
    private _dataSource: SearchFieldDataSource<any>;

    /** @hidden */
    private _categories: ValueLabelItem[];

    /** @hidden */
    private _currentSearchSuggestionAnnouncementMessage = '';

    /** @hidden */
    private _suggestionkeyManager: FocusKeyManager<SearchFieldSuggestionDirective>;

    /** @hidden */
    private resolveTranslation = resolveTranslationSyncFn();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _dataSourceChanged$ = new Subject<void>();

    /** @hidden */
    private _appearance: Appearance;

    /** @hidden */
    private _mobileComponent: ComponentRef<SearchFieldMobileComponent>;

    /** @hidden */
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        private readonly _liveAnnouncer: LiveAnnouncer,
        readonly _dynamicComponentService: DynamicComponentService,
        readonly contentDensityObserver: ContentDensityObserver,
        @Optional() @Inject(FD_SHELLBAR_COMPONENT) protected _shellbar: ShellbarComponent
    ) {
        super();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (this.mobile && this.isOpen && KeyUtil.isKeyCode(event, [ESCAPE])) {
            this.showDialog(false);
        }
    }

    /** @hidden */
    ngOnInit(): void {
        const baseId = 'fdp-search-field';
        this._inputId = `${baseId}-input-${searchFieldIdCount++}`;
        this._submitId = `${baseId}-submit-${searchFieldIdCount++}`;
        this._menuId = `${baseId}-menu-${searchFieldIdCount++}`;
        this._popoverHeaderId = `${baseId}-popover-header-${searchFieldIdCount++}`;
        this._popoverBodyId = `${baseId}-popover-body-${searchFieldIdCount++}`;

        this._isRefresh = true;

        if (this.dataSource && this._shellbar) {
            this.onValueChange(this.inputText);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.suggestionItems.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._resetKeyManager();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('categories' in changes || 'currentCategory' in changes) {
            this.setCurrentCategory(this.currentCategory);
        }
        if ('mobile' in changes) {
            setTimeout(() => {
                this._setUpMobileMode();
            });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._suggestionkeyManager?.destroy();
    }

    /**
     * Focuses the search input field.
     */
    focus(): void {
        this.inputField.nativeElement.focus();
        this.detectChanges();
    }

    /** Capturing onKeydown of input element */
    onKeydown(event: KeyboardEvent): void {
        if (!event) {
            return;
        }

        if (KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            if (event.altKey && this.categories) {
                this.closeSuggestionMenu(false);
                this.categoryDropdown?.open();
                this.categorySelectComponent?.open();
            } else if (this._suggestionkeyManager) {
                this._suggestionkeyManager.onKeydown(event);
            }
        } else if (KeyUtil.isKeyCode(event, [ESCAPE])) {
            this.closeSuggestionMenu(true);
        }
    }

    /**
     * Capturing value change in input text field of combobox.
     * @hidden
     */
    onValueChange(event: string): void {
        if (!event) {
            event = '';
        }
        // when search result not changed but input text is changed.
        // again need to announce the result, so clear this message.
        setTimeout(() => (this._currentSearchSuggestionAnnouncementMessage = ''));
        this._isSearchDone = false;
        this._isRefresh = false;

        if (this.mobile && !this.isOpen) {
            this.openMobileMode();
        }

        this.inputChange.emit(this.searchFieldValue);
        const inputStr: string = event.trim();
        if (inputStr.length === 0) {
            this._selectedSuggestionItem = null;
            this._selectedSuggestionItemId = '';
            if (!this.allowEmptySearch) {
                this.closeSuggestionMenu();
            }
        }

        if (this.dataSource) {
            const match = new Map();
            match.set('keyword', inputStr);
            match.set('category', this._currentCategory?.value || null);

            this.dataSource.match(match);
        }

        if (!this.mobile && this._getSuggestionsLength() > 0) {
            this.openSuggestionMenu();
        }

        this._updateSearchAnnouncementText();
    }

    /**
     * Capturing item selection from dropdown menu of combobox.
     * @hidden
     */
    onItemClick(event: SuggestionItem | string, suggestionListItem?: ListItemComponent): void {
        if (typeof event === 'string') {
            this.inputText = event;
        } else if (event?.value) {
            if (event.searchInScopeText || event.searchInScopeCounter) {
                if (event.searchInScopeCallback) {
                    const mockClick = new Event('click');
                    this._performButtonClick(mockClick, event.searchInScopeCallback);
                }
                return;
            } else if (event.showMoreText) {
                if (event.showMoreCallback) {
                    const mockClick = new Event('click');
                    this._performButtonClick(mockClick, event.showMoreCallback);
                }
                return;
            }
            this.inputText = event.value;
            this._selectedSuggestionItem = event;
            if (suggestionListItem?.id) {
                this._selectedSuggestionItemId = suggestionListItem.id;
            }
        }
        this.inputChange.emit(this.searchFieldValue);
        this.searchSubmit.emit(this.searchFieldValue);
        this.closeSuggestionMenu();
        if (this.mobile) {
            this.showDialog(false);
        }
        this._isSearchDone = true;
        this.detectChanges();
    }

    /**
     * Callback function which gets executed on keyboard enter of input text field.
     * @hidden
     */
    onSearchSubmit(event?: Event): void {
        event?.preventDefault();

        if (this.isLoading) {
            this.cancelSearch.emit();
            return;
        }

        this.searchSubmit.emit(this.searchFieldValue);

        this._isRefresh = true;

        if (this.inputText) {
            this._isSearchDone = true;
        }

        this.closeSuggestionMenu(false);
    }

    /**
     * Sets current category.
     * @hidden
     */
    setCurrentCategory(currentCategory: ValueLabelItem | null): void {
        this._currentCategory =
            currentCategory &&
            this.categories?.find(
                (category) => category.label === currentCategory.label && category.value === currentCategory.value
            );

        if (this._isOpen$()) {
            this.onValueChange(this.inputText);
        }
        this.inputChange.emit(this.searchFieldValue);
    }

    /**
     * Open suggestion menu
     */
    openSuggestionMenu(): void {
        this._isOpen$.set(true);
        this._resetKeyManager();
        if (this._isOpen$()) {
            return;
        }

        this._isOpen$.set(true);
    }

    /** @hidden */
    openMobileMode(): void {
        if (this._shellbar) {
            this._mobileComponent.instance._inShellbar = true;
        }
        this.showDialog(true);
    }

    /** @hidden */
    dialogApprove(): void {
        this.onItemClick(this.inputText);
    }

    /** @hidden */
    dialogDismiss(): void {
        this.showDialog(false);
    }

    /** @hidden */
    showDialog(isOpen: boolean): void {
        if (!isOpen) {
            this.closeSuggestionMenu();
        }
        if (this.isOpen !== isOpen) {
            this.isOpen = isOpen;

            this.isOpenChange.emit(isOpen);
        }
    }

    /** @hidden */
    closeSuggestionMenu(focus = true): void {
        if (focus) {
            this.focus();
        }
        this._isOpen$.set(false);
    }

    /** Resets the current category to its initial state. */
    resetCategory(): void {
        this._currentCategory = undefined;
        if (this.categorySelectComponent) {
            this.categorySelectComponent.value = undefined;
        }
    }

    /** @hidden */
    clearTextInput(): void {
        this.inputText = '';
        this.detectChanges();
        this.inputChange.emit(this.searchFieldValue);
        this.cancelSearch.emit(this.searchFieldValue);

        this._selectedSuggestionItem = null;
        this._selectedSuggestionItemId = '';

        this._isRefresh = true;
        this._isSearchDone = false;

        if (!this.allowEmptySearch) {
            this.closeSuggestionMenu(false);
        } else {
            if (this.dataSource) {
                const match = new Map();
                match.set('keyword', '');
                match.set('category', this._currentCategory?.value || null);

                this.dataSource.match(match);
            }

            this.openSuggestionMenu();
        }
        this.focus();
    }

    /** @hidden Method that handles complete event from auto complete directive, setting the new value, and closing popover */
    handleAutoComplete(event: AutoCompleteEvent): void {
        if (this._inputValueMatchesFirstSuggestion()) {
            this.inputText = event.term;
            this._selectedSuggestionItem = this._autoCompleteMostRecentSuggestionItem;
            this.onValueChange(this.inputText);
            this.onSearchSubmit();
            if (event.forceClose && this.inputText) {
                this.closeSuggestionMenu();
            }
        }
    }

    /** @hidden */
    _handleTabKey(event: Event): void {
        if (this._inputValueMatchesFirstSuggestion()) {
            event.preventDefault();
            this.handleAutoComplete({ term: this.inputText, forceClose: false });
            (this.inputField.nativeElement as HTMLInputElement).setSelectionRange(-1, -1);
        }
    }

    /** @hidden */
    _inputValueMatchesFirstSuggestion(): boolean {
        const inputEl = this.inputField.nativeElement as HTMLInputElement;
        return (
            inputEl.value === this.suggestionListEl.nativeElement.querySelector('.fd-list__item--suggestion')?.innerText
        );
    }

    /** @hidden */
    _focusActionButton(event: Event, suggestion: ListItemComponent): void {
        event.preventDefault();
        const keyboardEvent = event as KeyboardEvent;
        const suggestionEl = suggestion.elementRef.nativeElement;
        const actionButtons = suggestionEl.querySelectorAll('.fd-button');
        if (actionButtons) {
            if (document.activeElement === suggestionEl) {
                actionButtons[0].focus();
            } else {
                let focusedIndex = -1;
                for (let i = 0; i < actionButtons.length; i++) {
                    if (document.activeElement === actionButtons[i]) {
                        focusedIndex = i;
                    }
                }
                if (focusedIndex !== -1) {
                    keyboardEvent.shiftKey ? (focusedIndex = focusedIndex - 1) : (focusedIndex = focusedIndex + 1);
                    actionButtons[focusedIndex]?.focus();
                }
            }
        }
    }

    /** @hidden */
    _initializeDataSource(dataSource: SearchFieldDataSource<any>): void {
        this._dataSourceChanged$.next();
        dataSource
            .open()
            .pipe(takeUntil(merge(destroyObservable(this._destroyRef), this._dataSourceChanged$)))
            .subscribe((data) => {
                this._dropdownValues$ = of(data);
            });
        this._dataSource = dataSource;
    }

    /** @hidden helper function needed by template */
    _isString(suggestion: string | object): boolean {
        return typeof suggestion === 'string';
    }

    /** @hidden */
    _performButtonClick(event: Event, callbackFn: (() => any) | undefined): void {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (callbackFn) {
            callbackFn();
        }
    }

    /** @hidden */
    _searchResultIsHoveredOrFocusedOrMobile(suggestion: ListItemComponent): boolean {
        const suggestionEl = suggestion.elementRef.nativeElement;
        return (
            (this.mobile && this._selectedSuggestionItem === null) ||
            document.activeElement === suggestionEl ||
            suggestionEl.contains(document.activeElement) ||
            suggestionEl.matches(':hover')
        );
    }

    /** @hidden */
    _advancedFilterButtonClicked(): void {
        this.advancedFilterButtonClick.emit();
    }

    /** @hidden */
    _onlyHeadersFiltered(suggestions: (SuggestionItem | undefined)[]): boolean {
        let retVal = true;
        for (let i = 0; i < suggestions.length && retVal; i++) {
            if (!suggestions[i]?.data || !suggestions[i]?.data?.isHeader) {
                retVal = false;
            }
        }

        return retVal;
    }

    /** @hidden */
    _inputFocus(): void {
        this._isFocused = true;
        if (this._shellbar && this.allowEmptySearch) {
            this.openSuggestionMenu();
        }
    }

    /** @hidden */
    _handlePopoverKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this.focus();
        }
    }

    /** @hidden */
    _autoCompleteDisplayFn = (event: SuggestionItem): string => {
        this._autoCompleteMostRecentSuggestionItem = event;
        return event.value;
    };

    /** @hidden */
    private _resetKeyManager(): void {
        if (this.suggestionItems) {
            const keyManagerParam = this.suggestionItems
                .toArray()
                .sort((a, b) => this._getDomRowOrderIndex(a) - this._getDomRowOrderIndex(b));
            this._suggestionkeyManager?.destroy();
            this._suggestionkeyManager = new FocusKeyManager(keyManagerParam);

            this._setAriaOwns();
        }
    }

    /** @hidden */
    private _getDomRowOrderIndex(row: SearchFieldSuggestionDirective): number {
        const children = Array.prototype.slice.call(this.suggestionListEl.nativeElement.querySelectorAll('li'));
        return children.indexOf(row.element.nativeElement);
    }

    /**
     * @hidden return count for matching suggestion with input text
     * @returns number
     */
    private _getSuggestionsLength(): number {
        let count = 0;
        this._dropdownValues$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((suggestions) => {
            this._autoCompleteSuggestions = [];
            suggestions?.forEach((suggestion) => {
                const textToCheck = typeof suggestion === 'string' ? suggestion : suggestion?.value;
                if (this.inputText && textToCheck.toLowerCase().indexOf(this.inputText?.trim()?.toLowerCase()) > -1) {
                    count++;
                }
                if (!suggestion?.children && suggestion?.value) {
                    this._autoCompleteSuggestions.push(suggestion);
                } else if (suggestion?.children?.length) {
                    suggestion.children.forEach((child) => {
                        this._autoCompleteSuggestions.push(child);
                    });
                }
            });

            this._setAriaOwns();
        });

        return count;
    }

    /** @hidden */
    private _setAriaOwns(): void {
        this.detectChanges();
        const parentListEl = this.suggestionListEl?.nativeElement;
        parentListEl?.querySelectorAll('.fd-list').forEach((list: HTMLElement) => {
            const visibleChildren = list.querySelectorAll('.fd-list__item--suggestion');
            let childIds = '';
            visibleChildren.forEach((child) => {
                childIds += child.id + ' ';
            });
            list.setAttribute('aria-owns', childIds);
            const headerText = (list.querySelector('.fd-suggestion-header') as HTMLElement).innerText;
            if (headerText) {
                list.setAttribute('aria-label', headerText);
            }
        });
    }

    /** @hidden */
    private async _updateSearchAnnouncementText(): Promise<void> {
        // create search suggestion message with count.
        const suggestionCount = this._getSuggestionsLength();
        const searchSuggestionMessage = this.resolveTranslation('platformSearchField.searchSuggestionMessage', {
            count: suggestionCount
        });
        const searchSuggestionNavigateMessage = this.resolveTranslation(
            'platformSearchField.searchSuggestionNavigateMessage'
        );
        this._currentSearchSuggestionAnnouncementMessage =
            searchSuggestionMessage + (suggestionCount > 0 ? searchSuggestionNavigateMessage : '');
        if (this.inputText?.length > 0) {
            await this._liveAnnouncer.announce(this._currentSearchSuggestionAnnouncementMessage);
        }
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        if (this._mobileComponent) {
            this._mobileComponent.destroy();
        }

        const injector = Injector.create({
            providers: [{ provide: SEARCH_FIELD_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._mobileComponent = this._dynamicComponentService.createDynamicComponent(
            { inputFieldTemplate: this.inputFieldTemplate, suggestionMenuTemplate: this.suggestionMenuTemplate },
            SearchFieldMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            {
                injector
            }
        );
    }
}

@Pipe({
    name: 'suggestionMatches',
    standalone: true
})
export class SuggestionMatchesPipe implements PipeTransform {
    /** @hidden */
    transform(suggestions: SuggestionItem[] | null | undefined, match: string): (SuggestionItem | undefined)[] {
        if (!suggestions) {
            suggestions = [];
        }
        if (!match) {
            match = '';
        }
        const processedMatch = match.trim().toLowerCase();
        return suggestions.filter((suggestion) => {
            const textToCheck = typeof suggestion === 'string' ? suggestion : suggestion.value;
            return textToCheck.toLowerCase().indexOf(processedMatch) > -1 || suggestion.isGroupHeader;
        });
    }
}
