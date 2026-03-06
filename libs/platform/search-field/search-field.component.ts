import { CdkTrapFocus, FocusableOption, FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    forwardRef,
    inject,
    Injector,
    input,
    model,
    OnDestroy,
    OnInit,
    output,
    Pipe,
    PipeTransform,
    signal,
    TemplateRef,
    viewChild,
    viewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { isObservable, merge, Observable, Subject, Subscription } from 'rxjs';
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
import {
    ContentDensityDirective,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { ListComponent, ListItemComponent, ListModule } from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverComponent, PopoverModule } from '@fundamental-ngx/core/popover';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { Appearance, SearchComponent } from '@fundamental-ngx/core/shared';
import { FD_SHELLBAR_COMPONENT, FD_SHELLBAR_SEARCH_COMPONENT, Shellbar } from '@fundamental-ngx/core/shellbar';
import { TextComponent } from '@fundamental-ngx/core/text';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe, resolveTranslationSyncFn } from '@fundamental-ngx/i18n';
import { MenuComponent, MenuItemComponent, MenuTriggerDirective } from '@fundamental-ngx/platform/menu';
import { BaseComponent, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import { SEARCH_FIELD_COMPONENT } from './search-field-mobile/search-field-mobile.interface';
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
        ContentDensityDirective,
        CdkTrapFocus,
        forwardRef(() => SuggestionMatchesPipe)
    ]
})
export class SearchFieldComponent extends BaseComponent implements OnInit, OnDestroy, SearchComponent {
    /** Input change event. */
    readonly inputChange = output<SearchInput>();

    /** Search submit event. */
    readonly searchSubmit = output<SearchInput>();

    /** Cancel search event. */
    readonly cancelSearch = output<SearchInput>();

    /** Open mobile mode event. */
    readonly isOpenChange = output<boolean>();

    /** Event emitted when the advanced filter button is clicked. */
    readonly advancedFilterButtonClick = output<void>();

    /** @hidden */
    readonly categoryDropdown = viewChild<PopoverComponent>('categoryDropdown');

    /** @hidden */
    readonly categorySelectComponent = viewChild<SelectComponent>('categorySelectComponent');

    /** @hidden */
    readonly inputGroup = viewChild<ElementRef<HTMLElement>>('inputGroup');

    /** @hidden */
    readonly inputField = viewChild.required<ElementRef<HTMLElement>>('inputField');

    /** @hidden */
    readonly inputFieldTemplate = viewChild<TemplateRef<any>>('inputFieldTemplate');

    /** @hidden */
    readonly suggestionMenuTemplate = viewChild<TemplateRef<any>>('suggestionMenuTemplate');

    /** @hidden */
    readonly suggestionList = viewChild<ListComponent>('suggestionList');

    /** @hidden */
    readonly suggestionItems = viewChildren(SearchFieldSuggestionDirective);

    /** @hidden */
    readonly listItems = viewChildren(ListItemComponent);

    /** Type of component used to render the categories dropdown. */
    readonly categoryMode = model<'menu' | 'select'>('menu');

    /** Additional appearance configuration. */
    readonly appearance = model<Appearance>();

    /** Placeholder text for search input field. */
    readonly placeholder = input<string>('');

    /** Set Mobile Mode */
    readonly mobile = input(false, { transform: booleanAttribute });

    /** Search Field Mobile configuration */
    readonly mobileConfig = input<MobileModeConfig | undefined>(undefined);

    /** Whether display Refresh button */
    readonly disableRefresh = model<boolean>(false);

    /** Whether display search button */
    readonly disableSearch = input(false, { transform: booleanAttribute });

    /** List of string values to populate suggestion dropdown selection. */
    readonly suggestions = input<SuggestionItem[] | Observable<SuggestionItem[]>>([]);

    /** Datasource for suggestion list */
    readonly dataSource = input<SearchFieldDataSource<any> | undefined>(undefined);

    /** Initial input text. */
    readonly inputText = model<string>('');

    /** List of categories. */
    readonly categories = input<ValueLabelItem[]>([]);

    /** Current category, value should be present in categories array */
    readonly currentCategory = input<ValueLabelItem | undefined>(undefined);

    /** Set label for category dropdown button. */
    readonly categoryLabel = input<string>('Category');

    /** Hide display of category label */
    readonly hideCategoryLabel = input(false, { transform: booleanAttribute });

    /** Toggle "loading" mode. */
    readonly isLoading = input(false, { transform: booleanAttribute });

    /** Whether to always show search button. */
    readonly forceSearchButton = model<boolean>(false);

    /** Whether to disable the "suggestions found" live announcer. */
    readonly disableSuggestionsFoundAnnouncer = input(false, { transform: booleanAttribute });

    /** Whether to show the "All" option in the category select. */
    readonly showCategoryAllOption = input(false, { transform: booleanAttribute });

    /** @hidden */
    get searchFieldValue(): SearchInput {
        return {
            text: this.inputText(),
            category: this._currentCategory()?.value || null
        };
    }

    /** Title of the initial suggestion, if a suggestion list is displayed. */
    readonly initialSuggestionTitle = input<string>('');

    /** Subline of the initial suggestion, if a suggestion list is displayed. */
    readonly initialSuggestionSubline = input<string>('');

    /** Title of the initial suggestion if the user has entered some text and there are no results to display, and an initial suggestion title should be shown. */
    readonly initialSuggestionEmptyTitle = input<string>('');

    /** Title of the initial suggestion if the user has entered some text and there are no results to display, and an initial suggestion subline should be shown. */
    readonly initialSuggestionEmptySubline = input<string>('');

    /** Subline of the initial suggestion, if a suggestion list is displayed. */
    readonly suggestionFooter = input<TemplateRef<any> | null>(null);

    /** Template to display when the search results list has no items to display. */
    readonly searchResultsEmptyTemplate = input<TemplateRef<any> | null>(null);

    /** Options to display when the user has entered a string into the input that returns no results. */
    readonly searchResultsEmptyDefaultSuggestions = input<SuggestionItem[] | null>(null);

    /** Whether to show the advanced filter button, which emits the event `advancedFilterButtonClick`. If this input is set to true, it will override any other category button settings. */
    readonly showAdvancedFilter = input<boolean>(false);

    /** Whether to allow empty searches when using a data source, meaning all results will be displayed when the search input is empty. */
    readonly allowEmptySearch = input<boolean>(false);

    /** Whether to display a suggestion item as selected after it has been clicked. */
    readonly enableSelection = input<boolean>(false);

    /** Whether to display the busy indicator over the suggestion list. */
    readonly suggestionsLoading = input<boolean>(false);

    /** Title for the busy indicator. */
    readonly busyIndicatorTitle = input<string>('');

    /** Aria value text for the busy indicator. */
    readonly busyIndicatorAriaValueText = input<string>('');

    /** @hidden Focus state */
    _isFocused = signal(false);

    /**
     * Signal list of suggestion items to populate dropdown menu.
     * @hidden
     */
    dropdownValues = signal<SuggestionItem[]>([]);

    /**
     * Currently set category.
     * @hidden
     */
    _currentCategory = signal<ValueLabelItem | null | undefined>(undefined);

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
    _popoverBodyId = signal('');

    /** @hidden */
    isOpen = false;

    /** @hidden */
    _isRefresh = false;

    /** @hidden */
    _isSearchDone = false;

    /** @hidden */
    _isSuggestionMenuOpen = signal(false);

    /** @hidden */
    autoCompleteSuggestions: SuggestionItem[] = [];

    /** @hidden */
    _selectedSuggestionItem: SuggestionItem | null;

    /** @hidden */
    _autoCompleteMostRecentSuggestionItem: SuggestionItem;

    /** @hidden */
    _selectedSuggestionItemId = signal('');

    /** @hidden */
    _categorySelectDescription = signal('');

    /** @hidden */
    _actionButtonTabIndex = signal<-1 | 0>(-1);

    /** @hidden */
    protected readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    protected readonly _shellbar: Shellbar | null = inject(FD_SHELLBAR_COMPONENT, { optional: true });

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
    private _mobileComponent: ComponentRef<SearchFieldMobileComponent>;

    /** @hidden */
    private _suggestionsSubscription: Subscription;

    /** @hidden */
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        private readonly _liveAnnouncer: LiveAnnouncer,
        readonly _dynamicComponentService: DynamicComponentService
    ) {
        super();

        // Effect to handle suggestions changes
        effect(() => {
            const suggestionsValue = this.suggestions();
            if (Array.isArray(suggestionsValue)) {
                this.dropdownValues.set(suggestionsValue);
            } else if (isObservable(suggestionsValue)) {
                if (!this._suggestionsSubscription) {
                    this._suggestionsSubscription = suggestionsValue
                        .pipe(takeUntilDestroyed(this._destroyRef))
                        .subscribe((values) => {
                            this.dropdownValues.set(values);
                        });
                }
            } else {
                this.dropdownValues.set([]);
            }
        });

        // Effect to handle dataSource changes
        effect(() => {
            const ds = this.dataSource();
            if (ds) {
                this._initializeDataSource(ds);
            }
        });

        // Effect to handle categories changes
        effect(() => {
            const cats = this.categories();
            this._showCategoryDropdown = Array.isArray(cats) && cats.length > 0;
        });

        // Effect to handle currentCategory changes
        effect(() => {
            const currentCat = this.currentCategory();
            if (currentCat) {
                this.setCurrentCategory(currentCat);
            }
        });

        // Effect to handle mobile changes - only setup when actually needed
        effect(() => {
            const isMobile = this.mobile();
            if (isMobile) {
                // Defer to next tick to avoid running during construction
                queueMicrotask(() => {
                    this._setUpMobileMode();
                });
            }
        });

        // Watch for changes to suggestionItems using an effect
        // Use afterNextRender to ensure view is initialized
        effect(() => {
            const items = this.suggestionItems();
            // Use queueMicrotask to defer execution after view initialization
            queueMicrotask(() => {
                if (items.length > 0) {
                    this._resetKeyManager();
                }
            });
        });
    }

    /** @hidden */
    ngOnInit(): void {
        const baseId = 'fdp-search-field';
        this._inputId = `${baseId}-input-${searchFieldIdCount++}`;
        this._submitId = `${baseId}-submit-${searchFieldIdCount++}`;
        this._menuId = `${baseId}-menu-${searchFieldIdCount++}`;
        this._popoverHeaderId = `${baseId}-popover-header-${searchFieldIdCount++}`;
        this._popoverBodyId.set(`${baseId}-popover-body-${searchFieldIdCount++}`);

        this._isRefresh = true;

        if (this.dataSource() && this._shellbar) {
            this.onValueChange(this.inputText());
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._suggestionsSubscription?.unsubscribe();
        this._mobileComponent?.destroy();
        this._suggestionkeyManager?.destroy();
    }

    /**
     * Focuses the search input field.
     */
    focus(): void {
        this.inputField().nativeElement.focus();
        this.detectChanges();
    }

    /** Capturing onKeydown of input element */
    onKeydown(event: KeyboardEvent): void {
        if (!event) {
            return;
        }

        if (KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            if (event.altKey && this.categories().length > 0) {
                this.closeSuggestionMenu(false);
                this.categoryDropdown()?.open();
                this.categorySelectComponent()?.open();
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

        if (this.mobile() && !this._mobileComponent?.instance?.dialogRef?.isOpen()) {
            this.openMobileMode();
        }

        this.inputChange.emit(this.searchFieldValue);
        const inputStr: string = event.trim();
        if (inputStr.length === 0) {
            this._selectedSuggestionItem = null;
            this._selectedSuggestionItemId.set('');
            if (!this.allowEmptySearch()) {
                this.closeSuggestionMenu();
            }
        }

        const ds = this.dataSource();
        if (ds) {
            const match = new Map();
            match.set('keyword', inputStr);
            match.set('category', this._currentCategory()?.value || null);

            ds.match(match);
        }

        if (!this.mobile() && this._getSuggestionsLength() > 0) {
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
            this.inputText.set(event);
        } else if (event?.value) {
            if (event.searchInScopeText || event.searchInScopeCounter) {
                if (event.searchInScopeCallback) {
                    this._performButtonClick(null, event.searchInScopeCallback);
                }
                return;
            } else if (event.showMoreText) {
                if (event.showMoreCallback) {
                    this._performButtonClick(null, event.showMoreCallback);
                }
                return;
            }
            this.inputText.set(event.value);
            this._selectedSuggestionItem = event;
            if (suggestionListItem?.id) {
                this._selectedSuggestionItemId.set(suggestionListItem.id);
            }
        }
        this.inputChange.emit(this.searchFieldValue);
        this.searchSubmit.emit(this.searchFieldValue);
        this.closeSuggestionMenu();
        if (this.mobile()) {
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

        if (this.isLoading()) {
            this.cancelSearch.emit(this.searchFieldValue);
            return;
        }

        this.searchSubmit.emit(this.searchFieldValue);

        this._isRefresh = true;

        if (this.inputText()) {
            this._isSearchDone = true;
        }

        this.closeSuggestionMenu(false);
        (this.inputField().nativeElement as HTMLInputElement).setSelectionRange(-1, -1);
    }

    /**
     * Sets current category.
     * @hidden
     */
    setCurrentCategory(currentCategory: ValueLabelItem | null): void {
        this._currentCategory.set(
            currentCategory &&
                this.categories().find(
                    (category: ValueLabelItem) =>
                        category.label === currentCategory.label && category.value === currentCategory.value
                )
        );

        if (this._isSuggestionMenuOpen()) {
            this.onValueChange(this.inputText());
        }
        this.inputChange.emit(this.searchFieldValue);
    }

    /**
     * Open suggestion menu
     */
    openSuggestionMenu(): void {
        this._isSuggestionMenuOpen.set(true);
        this._resetKeyManager();
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
        this.onItemClick(this.inputText());
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
        if (this._mobileComponent?.instance?.dialogRef?.isOpen() !== isOpen) {
            this.isOpen = isOpen;

            this.isOpenChange.emit(isOpen);
        }
    }

    /** @hidden */
    closeSuggestionMenu(focus = true): void {
        if (focus) {
            this.focus();
        }
        this._isSuggestionMenuOpen.set(false);
    }

    /** Resets the current category to its initial state. */
    resetCategory(): void {
        this._currentCategory.set(undefined);
        const selectComp = this.categorySelectComponent();
        if (selectComp) {
            selectComp.value = undefined;
        }
    }

    /** @hidden */
    clearTextInput(): void {
        this.inputText.set('');
        this.detectChanges();
        this.inputChange.emit(this.searchFieldValue);
        this.cancelSearch.emit(this.searchFieldValue);

        this._selectedSuggestionItem = null;
        this._selectedSuggestionItemId.set('');

        this._isRefresh = true;
        this._isSearchDone = false;

        if (!this.allowEmptySearch()) {
            this.closeSuggestionMenu(false);
        } else {
            const ds = this.dataSource();
            if (ds) {
                const match = new Map();
                match.set('keyword', '');
                match.set('category', this._currentCategory()?.value || null);

                ds.match(match);
            }

            this.openSuggestionMenu();
        }
        this.focus();
    }

    /** @hidden Method that handles complete event from auto complete directive, setting the new value, and closing popover */
    handleAutoComplete(event: AutoCompleteEvent): void {
        if (this._inputValueMatchesFirstSuggestion()) {
            this.inputText.set(event.term);
            this._selectedSuggestionItem = this._autoCompleteMostRecentSuggestionItem;
            this.onValueChange(this.inputText());
            this.onSearchSubmit();
            if (event.forceClose && this.inputText()) {
                this.closeSuggestionMenu();
            }
        }
    }

    /** @hidden */
    _categorySelectClicked(event: MouseEvent): void {
        if (this.mobile() && !this._mobileComponent?.instance?.dialogRef?.isOpen()) {
            event.preventDefault();
            // event.stopImmediatePropagation();
            this.openMobileMode();
        }
    }

    /** @hidden */
    _handleInputTabKey(event: Event): void {
        if (this._inputValueMatchesFirstSuggestion()) {
            event.preventDefault();
            this.handleAutoComplete({ term: this.inputText(), forceClose: false });
            (this.inputField().nativeElement as HTMLInputElement).setSelectionRange(-1, -1);
        }
    }

    /** @hidden */
    _inputValueMatchesFirstSuggestion(): boolean {
        const inputEl = this.inputField().nativeElement as HTMLInputElement;
        const listItemsArray = this.listItems();
        const firstListItem = listItemsArray[0];
        return firstListItem?.listTitle && inputEl.value === firstListItem.listTitle.elRef.nativeElement.innerText;
    }

    /** @hidden */
    _focusActionButton(event: Event, suggestion: ListItemComponent): void {
        event.preventDefault();
        event.stopPropagation();
        const suggestionEl = suggestion.elementRef.nativeElement;
        const firstButton = suggestionEl.querySelector('.fd-button') as HTMLElement;
        if (firstButton) {
            if (document.activeElement === suggestionEl) {
                this._actionButtonTabIndex.set(0);
                firstButton.focus();
            }
        }
    }

    /** @hidden */
    _focusParentListItem(event: Event, suggestion: ListItemComponent): void {
        event.preventDefault();
        event.stopPropagation();
        this._actionButtonTabIndex.set(-1);
        suggestion.elementRef?.nativeElement?.focus();
    }

    /** @hidden */
    _initializeDataSource(dataSource: SearchFieldDataSource<any>): void {
        this._dataSourceChanged$.next();
        dataSource
            .open()
            .pipe(takeUntil(merge(destroyObservable(this._destroyRef), this._dataSourceChanged$)))
            .subscribe((data) => {
                this.dropdownValues.set(data);
            });
    }

    /** @hidden helper function needed by template */
    _isString(suggestion: string | object): boolean {
        return typeof suggestion === 'string';
    }

    /** @hidden */
    _performButtonClick(event: Event | null, callbackFn: (() => any) | undefined): void {
        if (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        if (callbackFn) {
            callbackFn();
        }
    }

    /** @hidden */
    _searchResultIsHoveredOrFocusedOrMobile(suggestion: ListItemComponent): boolean {
        const suggestionEl = suggestion.elementRef.nativeElement;
        return (
            (this.mobile() && this._selectedSuggestionItem === null) ||
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
        this._isFocused.set(true);
        if (this._shellbar && this.allowEmptySearch()) {
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
        const items = this.suggestionItems();
        if (items.length > 0) {
            const keyManagerParam = [...items].sort(
                (a, b) => this._getDomRowOrderIndex(a) - this._getDomRowOrderIndex(b)
            );
            this._suggestionkeyManager?.destroy();
            this._suggestionkeyManager = new FocusKeyManager(keyManagerParam);

            this._setAriaOwns();
        }
    }

    /** @hidden */
    private _getDomRowOrderIndex(row: SearchFieldSuggestionDirective): number {
        const suggestionListRef = this.suggestionList();
        if (!suggestionListRef) {
            return -1;
        }
        const listItems = this.listItems();
        return listItems.findIndex((item) => item.elementRef.nativeElement === row.element.nativeElement);
    }

    /**
     * @hidden return count for matching suggestion with input text
     * @returns number
     */
    private _getSuggestionsLength(): number {
        let count = 0;
        const suggestions = this.dropdownValues();
        this.autoCompleteSuggestions = [];

        suggestions?.forEach((suggestion) => {
            const textToCheck = typeof suggestion === 'string' ? suggestion : suggestion?.value;
            if (this.inputText() && textToCheck.toLowerCase().indexOf(this.inputText()?.trim()?.toLowerCase()) > -1) {
                count++;
            }
            if (!suggestion?.children && suggestion?.value) {
                this.autoCompleteSuggestions.push(suggestion);
            } else if (suggestion?.children?.length) {
                suggestion.children.forEach((child) => {
                    this.autoCompleteSuggestions.push(child);
                });
            }
        });

        this._setAriaOwns();
        return count;
    }

    /** @hidden */
    private _setAriaOwns(): void {
        this.detectChanges();
        const suggestionListRef = this.suggestionList();
        const parentListEl = suggestionListRef?.elementRef.nativeElement;
        if (!parentListEl) {
            return;
        }

        // Use the already-queried listItems instead of querySelectorAll
        const listItems = this.listItems();
        const listItemsMap = new Map<HTMLElement, string>();

        // Build a map of parent lists to their child IDs
        listItems.forEach((item) => {
            const itemEl = item.elementRef.nativeElement;
            if (itemEl.classList.contains('fd-list__item--suggestion')) {
                const parentList = itemEl.closest('.fd-list') as HTMLElement;
                if (parentList) {
                    const existing = listItemsMap.get(parentList) || '';
                    listItemsMap.set(parentList, existing + itemEl.id + ' ');
                }
            }
        });

        // Set aria-owns on each parent list
        listItemsMap.forEach((childIds, list) => {
            list.setAttribute('aria-owns', childIds.trim());
            const headerEl = list.querySelector('.fd-suggestion-header') as HTMLElement;
            const headerText = headerEl?.innerText;
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
        if (this.inputText()?.length > 0) {
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
            {
                inputFieldTemplate: this.inputFieldTemplate(),
                suggestionMenuTemplate: this.suggestionMenuTemplate()
            },
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
