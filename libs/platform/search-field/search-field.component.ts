import { FocusableOption, FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    Directive,
    DOCUMENT,
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
import { map, takeUntil } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
    destroyObservable,
    DynamicComponentService,
    KeyUtil,
    RtlService,
    SearchHighlightPipe
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverComponent, PopoverModule } from '@fundamental-ngx/core/popover';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import { FD_SHELLBAR_SEARCH_COMPONENT } from '@fundamental-ngx/core/shellbar';
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
    value: string;
    isHistorical?: string;
    data?: any;
}

export interface ValueLabelItem {
    value: string;
    label: string;
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
    constructor(private element: ElementRef) {}

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
            // convert suggestions to an array of string for "dropdown values"
            const dropdownValues = value.map((suggestion: SuggestionItem) => suggestion.value);
            this._dropdownValues$ = of(dropdownValues);
        } else if (isObservable(value)) {
            this._dropdownValues$ = value.pipe(
                map((suggestions: SuggestionItem[]) => suggestions.map((suggestion) => suggestion.value))
            );
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
    inputText: string;

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

    /** @hidden */
    @ViewChild('categoryDropdown', { static: false })
    categoryDropdown: PopoverComponent;

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
    @ViewChildren(SearchFieldSuggestionDirective)
    suggestionItems: QueryList<SearchFieldSuggestionDirective>;

    /** @hidden */
    get searchFieldValue(): SearchInput {
        return {
            text: this.inputText,
            category: this._currentCategory?.value || null
        };
    }
    /** @hidden Focus state */
    _isFocused = false;

    /**
     * Observable list of string values taken from `suggestions` to populate dropdown menu.
     * @hidden
     */
    _dropdownValues$: Observable<string[]> = of([]);

    /**
     * Currently set category.
     * @hidden
     */
    _currentCategory?: ValueLabelItem;

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
    readonly _dir$ = computed<Direction>(() => (this._rtl?.rtlSignal() ? 'rtl' : 'ltr'));

    /** @hidden */
    isOpen = false;

    /** @hidden */
    _isRefresh = false;

    /** @hidden */
    _isSearchDone = false;

    /** @hidden */
    _isOpen$ = signal(false);

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
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        @Optional() private readonly _rtl: RtlService,
        @Inject(DOCUMENT) private readonly _document: Document,
        private readonly _liveAnnouncer: LiveAnnouncer,
        readonly _dynamicComponentService: DynamicComponentService,
        readonly contentDensityObserver: ContentDensityObserver
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

        this._isRefresh = true;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('categories' in changes || 'currentCategory' in changes) {
            this.setCurrentCategory(this.currentCategory);
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
            if (this._suggestionkeyManager) {
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
            this.closeSuggestionMenu();
            return;
        }

        if (!this.mobile) {
            this.openSuggestionMenu();
        }

        if (this.dataSource) {
            const match = new Map();
            match.set('keyword', inputStr);
            match.set('category', this._currentCategory?.value || null);

            this.dataSource.match(match);
        }

        this._updateSearchAnnouncementText();
    }

    /**
     * Capturing item selection from dropdown menu of combobox.
     * @hidden
     */
    onItemClick(event: string): void {
        this.inputText = event;
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
    setCurrentCategory(currentCategory: ValueLabelItem): void {
        this._currentCategory =
            currentCategory &&
            this.categories?.find(
                (category) => category.label === currentCategory.label && category.value === currentCategory.value
            );

        this.inputChange.emit(this.searchFieldValue);
    }

    /**
     * Open suggestion menu
     */
    openSuggestionMenu(): void {
        this._isOpen$.set(true);
        this._suggestionkeyManager?.destroy();
        this._suggestionkeyManager = new FocusKeyManager(this.suggestionItems);
        if (this._isOpen$()) {
            return;
        }

        this._isOpen$.set(true);
    }

    /** @hidden */
    openMobileMode(): void {
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

    /** @hidden */
    clearTextInput(): void {
        this.inputText = '';
        this.detectChanges();
        this.inputChange.emit(this.searchFieldValue);
        this.cancelSearch.emit(this.searchFieldValue);

        this._isRefresh = true;
        this._isSearchDone = false;

        this.closeSuggestionMenu(false);
        this.focus();
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

    /**
     * @hidden return count for matching suggestion with input text
     * @returns number
     */
    private _getSuggestionsLength(): number {
        let count = 0;
        this._dropdownValues$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((suggestions) => {
            suggestions?.forEach((suggestion) => {
                if (this.inputText && suggestion?.toLowerCase().indexOf(this.inputText?.trim()?.toLowerCase()) > -1) {
                    count++;
                }
            });
        });

        return count;
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
        const injector = Injector.create({
            providers: [{ provide: SEARCH_FIELD_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicComponent(
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
    transform(values: string[] | null, match: string): string[] {
        if (!values) {
            values = [];
        }
        if (!match) {
            return values;
        }
        const processedMatch = match.trim().toLowerCase();
        return values.filter((value) => value.toLowerCase().indexOf(processedMatch) > -1);
    }
}
