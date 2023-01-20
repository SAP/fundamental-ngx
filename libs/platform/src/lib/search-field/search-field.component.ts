import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Pipe,
    PipeTransform,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { FocusableOption, FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { TemplatePortal } from '@angular/cdk/portal';
import { Direction } from '@angular/cdk/bidi';

import { firstValueFrom, fromEvent, isObservable, merge, Observable, of, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

import { DynamicComponentService, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { BaseComponent, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import {
    SEARCH_FIELD_COMPONENT,
    SearchFieldMobileInterface
} from './search-field-mobile/search-field-mobile.interface';
import { SearchFieldMobileComponent } from './search-field-mobile/search-field/search-field-mobile.component';
import { PlatformSearchFieldMobileModule } from './search-field-mobile/search-field-mobile.module';
import { FdLanguage, FD_LANGUAGE, TranslationResolver } from '@fundamental-ngx/i18n';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FD_SHELLBAR_SEARCH_COMPONENT } from '@fundamental-ngx/core/shellbar';
import { SearchComponent } from '@fundamental-ngx/core/shared';
import equal from 'fast-deep-equal';

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
        tabindex: '-1',
        role: 'list-item'
    }
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
    styleUrls: ['./search-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_SHELLBAR_SEARCH_COMPONENT,
            useExisting: SearchFieldComponent
        }
    ]
})
export class SearchFieldComponent
    extends BaseComponent
    implements OnInit, OnChanges, OnDestroy, SearchFieldMobileInterface, SearchComponent
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
        this._cd.detectChanges();
    }

    get appearance(): Appearance {
        return this._appearance;
    }

    /** Place holder text for search input field. */
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

    /**
     * ARIA label to specify what the search field is
     * Not shown in the UI, only visible by the screen-readers.
     */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     * Id of elements (separated by space) for setting aria-labelledby for search input
     * Not shown in the UI, only visible by the screen-readers.
     */
    @Input()
    ariaLabelledby: string;

    /**
     * @deprecated use i18n capabilities instead
     * Message announced by screen reader, when search suggestions opens.
     */
    @Input()
    searchSuggestionMessage: string;

    /**
     * @deprecated use i18n capabilities instead
     * Second part of message for search suggestion.
     * direction for navigating the suggestion. This is not necessry in case of 0 suggestion.
     */
    @Input()
    searchSuggestionNavigateMessage: string;

    /** Whether to always show search button. */
    @Input()
    forceSearchButton = false;

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

    /** @hidden Focus state */
    get isFocused(): boolean {
        return this._document?.activeElement === this.inputField?.nativeElement;
    }

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
     * Whether or not to show typeahead dropdown.
     * @hidden
     */
    _showDropdown = false;

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
    _dir: Direction = 'ltr';

    /** @hidden */
    isOpen = false;

    /** @hidden */
    _isRefresh = false;

    /** @hidden */
    _isSearchDone = false;

    /** @hidden */
    private _suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;

    /** @hidden */
    private _dataSource: SearchFieldDataSource<any>;

    /** @hidden */
    private _categories: ValueLabelItem[];

    /** @hidden */
    private _currentSearchSuggestionAnnoucementMessage = '';

    /** @hidden */
    private _suggestionOverlayRef: OverlayRef | null;

    /** @hidden */
    private _suggestionPortal: TemplatePortal;

    /** @hidden */
    private _suggestionkeyManager: FocusKeyManager<SearchFieldSuggestionDirective>;

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    private readonly _dataSourceChanged$ = new Subject<void>();

    /** @hidden */
    private _appearance: Appearance;

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

    /** @hidden */
    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private readonly _overlay: Overlay,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        protected readonly _cd: ChangeDetectorRef,
        @Optional() private readonly _rtl: RtlService,
        @Inject(DOCUMENT) private readonly _document: Document,
        @Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>,
        private readonly _liveAnnouncer: LiveAnnouncer,
        readonly _dynamicComponentService: DynamicComponentService,
        readonly contentDensityObserver: ContentDensityObserver
    ) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        const baseId = 'fdp-search-field';
        this._inputId = `${baseId}-input-${searchFieldIdCount++}`;
        this._submitId = `${baseId}-submit-${searchFieldIdCount++}`;
        this._menuId = `${baseId}-menu-${searchFieldIdCount++}`;

        this._isRefresh = true;

        if (this._rtl) {
            this._rtl.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl: boolean) => {
                this._dir = isRtl ? 'rtl' : 'ltr';
                this._cd.detectChanges();
            });
        }

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
        if (this._suggestionOverlayRef) {
            this._suggestionOverlayRef.dispose();
            this._suggestionOverlayRef = null;
        }
        this._onDestroy$.next();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (this.mobile && this.isOpen && KeyUtil.isKeyCode(event, [ESCAPE])) {
            this.showDialog(false);
        }
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
        setTimeout(() => (this._currentSearchSuggestionAnnoucementMessage = ''));
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

        this._updateSearchAnnoucementText();
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
        this._cd.detectChanges();
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
        this.closeSuggestionMenu();
        this._suggestionkeyManager = new FocusKeyManager(this.suggestionItems);
        if (this._showDropdown) {
            return;
        }

        // create overlay
        const overlayConfig = this._createSuggetionOverlayConfig();
        this._suggestionOverlayRef = this._overlay.create(overlayConfig);

        // get portal to attach to overlay
        this._suggestionPortal = new TemplatePortal(this.suggestionMenuTemplate, this._viewContainerRef);
        this._suggestionOverlayRef.attach(this._suggestionPortal);

        // add subscription to capture outside clicks
        fromEvent<MouseEvent>(document, 'click')
            .pipe(
                filter((event) => {
                    const target = event.target as HTMLElement;
                    return (
                        !!this._suggestionOverlayRef &&
                        !this._suggestionOverlayRef.overlayElement.contains(target) &&
                        this._showDropdown
                    );
                }),
                take(1),
                takeUntil(this._onDestroy$)
            )
            .subscribe((event) => {
                const target = event.target as HTMLElement;
                const focus = !(target.tagName === 'INPUT' && this._inputId !== target.id);
                this.closeSuggestionMenu(focus);
            });

        this._showDropdown = true;
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
        if (!this._suggestionOverlayRef) {
            return;
        }
        this._suggestionOverlayRef.detach();
        if (focus) {
            this.inputField.nativeElement.focus();
        }
        this._showDropdown = false;
    }

    /** @hidden */
    clearTextInput(): void {
        this.inputText = '';
        this._cd.detectChanges();
        this.inputChange.emit(this.searchFieldValue);
        this.cancelSearch.emit(this.searchFieldValue);

        this._isRefresh = true;
        this._isSearchDone = false;

        this.closeSuggestionMenu(false);
        this.inputField.nativeElement.focus();
    }

    /** @hidden */
    _createSuggetionOverlayConfig(): OverlayConfig {
        const positions: ConnectedPosition[] = [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            }
        ];
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this.inputGroup)
            .withLockedPosition()
            .withPositions(positions);
        const scrollStrategy = this._overlay.scrollStrategies.reposition();
        return new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            width: this.inputGroup.nativeElement.offsetWidth
        });
    }

    /** @hidden */
    _initializeDataSource(dataSource: SearchFieldDataSource<any>): void {
        this._dataSourceChanged$.next();
        dataSource
            .open()
            .pipe(takeUntil(merge(this._onDestroy$, this._dataSourceChanged$)))
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
        this._dropdownValues$.pipe(takeUntil(this._onDestroy$)).subscribe((suggestions) => {
            suggestions?.forEach((suggestion) => {
                if (this.inputText && suggestion?.toLowerCase().indexOf(this.inputText?.trim()?.toLowerCase()) > -1) {
                    count++;
                }
            });
        });

        return count;
    }

    /** @hidden */
    private async _updateSearchAnnoucementText(): Promise<void> {
        // create search suggestion message with count.
        const suggestionCount = this._getSuggestionsLength();
        let { searchSuggestionMessage, searchSuggestionNavigateMessage } = this;
        if (searchSuggestionMessage) {
            searchSuggestionMessage = suggestionCount + ' ' + searchSuggestionMessage;
        }
        if (!searchSuggestionMessage || !searchSuggestionNavigateMessage) {
            const lang = await firstValueFrom(this._language$);
            if (!searchSuggestionMessage) {
                searchSuggestionMessage = this._translationResolver.resolve(
                    lang,
                    'platformSearchField.searchSuggestionMessage',
                    { count: suggestionCount }
                );
            }
            if (!searchSuggestionNavigateMessage) {
                searchSuggestionNavigateMessage = this._translationResolver.resolve(
                    lang,
                    'platformSearchField.searchSuggestionNavigateMessage'
                );
            }
        }
        this._currentSearchSuggestionAnnoucementMessage =
            searchSuggestionMessage + (suggestionCount > 0 ? searchSuggestionNavigateMessage : '');
        if (this.inputText?.length > 0) {
            this._liveAnnouncer.announce(this._currentSearchSuggestionAnnoucementMessage);
        }
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: SEARCH_FIELD_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicModule(
            { inputFieldTemplate: this.inputFieldTemplate, suggestionMenuTemplate: this.suggestionMenuTemplate },
            PlatformSearchFieldMobileModule,
            SearchFieldMobileComponent,
            this._viewContainerRef,
            injector
        );
    }
}

@Pipe({
    name: 'suggestionMatches'
})
export class SuggestionMatchesPipe implements PipeTransform {
    /** @hidden */
    transform(values: string[] | null, match: string, mobile = false): string[] {
        if (!values) {
            values = [];
        }
        if (mobile && !match) {
            return values;
        }
        const processedMatch = match.trim().toLowerCase();
        return values.filter((value) => value.toLowerCase().indexOf(processedMatch) > -1);
    }
}
