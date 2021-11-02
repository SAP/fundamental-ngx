import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Pipe,
    PipeTransform,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { FocusableOption, FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { TemplatePortal } from '@angular/cdk/portal';
import { Direction } from '@angular/cdk/bidi';

import { fromEvent, isObservable, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';

import { DynamicComponentService, KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { BaseComponent, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import {
    SEARCH_FIELD_COMPONENT,
    SearchFieldMobileInterface
} from './search-field-mobile/search-field-mobile.interface';
import { SearchFieldMobileComponent } from './search-field-mobile/search-field/search-field-mobile.component';
import { PlatformSearchFieldMobileModule } from './search-field-mobile/search-field-mobile.module';

export interface SearchInput {
    text: string;
    category: string;
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
    constructor(private element: ElementRef) {}

    focus(): void {
        this.element.nativeElement.focus();
    }
}

let searchFieldIdCount = 0;

@Component({
    selector: 'fdp-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchFieldComponent extends BaseComponent implements OnInit, OnDestroy, SearchFieldMobileInterface {
    /** Place holder text for search input field. */
    @Input()
    placeholder: string;

    /** Set Mobile Mode */
    @Input()
    mobile: boolean;

    /** Search Field Mobile configuration */
    @Input()
    mobileConfig: MobileModeConfig;

    /** List of string values to populate suggestion dropdown selection. */
    @Input()
    get suggestions(): SuggestionItem[] | Observable<SuggestionItem[]> {
        return this._suggestions;
    }

    set suggestions(value: SuggestionItem[] | Observable<SuggestionItem[]>) {
        this._suggestions = value;
        if (Array.isArray(value)) {
            // convert suggestions to an array of string for "dropdown values"
            const dropdownValues = value.map((suggestion: SuggestionItem) => {
                return suggestion.value;
            });
            this._dropdownValues$ = of(dropdownValues);
        } else if (isObservable<SuggestionItem[]>(value)) {
            this._dropdownValues$ = value.pipe(
                map((suggestions: SuggestionItem[]) => {
                    return suggestions.map((suggestion) => suggestion.value);
                })
            );
        } else {
            this._dropdownValues$ = of([]);
        }
    }

    /** Datasource for suggestion list */
    @Input()
    get dataSource(): SearchFieldDataSource<any> {
        return this._dataSource;
    }

    set dataSource(value: SearchFieldDataSource<any>) {
        if (value) {
            this._initializeDataSource(value);
        }
    }

    /** Initial input text. */
    @Input()
    inputText: string;

    /** List of categories. */
    @Input()
    get categories(): ValueLabelItem[] {
        return this._categories;
    }

    set categories(value: ValueLabelItem[]) {
        this._categories = value;
        this._showCategoryDropdown = Array.isArray(value) && value.length > 0;
    }

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
    ariaLabel: string;

    /**
     * Id of elements (separated by space) for setting aria-labelledby for search input
     * Not shown in the UI, only visible by the screen-readers.
     */
    @Input()
    ariaLabelledby: string;

    /**
     * Message announced by screen reader, when search suggestions opens.
     */
    @Input()
    searchSuggestionMessage = 'suggestions found.';

    /**
     * Second part of message for search suggestion.
     * direction for navigating the suggestion. This is not necessry in case of 0 suggestion.
     */
    @Input()
    searchSuggestionNavigateMessage = 'use up and down arrows to navigate';

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
        return this._isFocused;
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
    _currentCategory: ValueLabelItem;

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
    private _suggestionOverlayRef: OverlayRef;

    /** @hidden */
    private _suggestionPortal: TemplatePortal;

    /** @hidden */
    private _suggestionkeyManager: FocusKeyManager<SearchFieldSuggestionDirective>;

    /** @hidden */
    private _isFocused = false;

    /** @hidden */
    private _rtlChangeSubscription = Subscription.EMPTY;

    /** @hidden */
    private _outsideClickSubscription = Subscription.EMPTY;

    /** @hidden */
    private _dataSourceSubscription = Subscription.EMPTY;

    /** @hidden */
    private _suggestionSubscription = Subscription.EMPTY;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    @ViewChild('categoryDropdown', { static: false }) categoryDropdown: PopoverComponent;
    @ViewChild('inputGroup', { static: false }) inputGroup: ElementRef<HTMLElement>;
    @ViewChild('inputField', { static: false }) inputField: ElementRef<HTMLElement>;

    @ViewChild('inputFieldTemplate') inputFieldTemplate: TemplateRef<any>;
    @ViewChild('suggestionMenuTemplate', { static: false }) suggestionMenuTemplate: TemplateRef<any>;
    @ViewChildren(SearchFieldSuggestionDirective) suggestionItems: QueryList<SearchFieldSuggestionDirective>;

    /** @hidden */
    get searchFieldValue(): SearchInput {
        return {
            text: this.inputText,
            category: this._currentCategory?.value ? this._currentCategory.value : null
        };
    }

    constructor(
        private readonly _overlay: Overlay,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        protected readonly _cd: ChangeDetectorRef,
        @Optional() private readonly _rtl: RtlService,
        private readonly _elementRef: ElementRef,
        private readonly _liveAnnouncer: LiveAnnouncer,
        readonly _dynamicComponentService: DynamicComponentService
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
            this._rtlChangeSubscription = this._rtl.rtl.subscribe((isRtl: boolean) => {
                this._dir = isRtl ? 'rtl' : 'ltr';
                this._cd.detectChanges();
            });
        }

        this._listenElementEvents();

        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (!!this._suggestionOverlayRef) {
            this._suggestionOverlayRef.dispose();
            this._suggestionOverlayRef = null;
        }
        this._rtlChangeSubscription.unsubscribe();
        this._outsideClickSubscription.unsubscribe();
        this._dataSourceSubscription.unsubscribe();
        this._suggestionSubscription.unsubscribe();
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

    /** Capturing focus in mobile mode */
    onFocus(): void {
        this._isFocused = true;
        this._cd.markForCheck();
    }

    /** Capturing blur in mobile mode */
    onBlur(): void {
        this._isFocused = false;
        this._cd.markForCheck();
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
            match.set(
                'category',
                this._currentCategory && this._currentCategory.value ? this._currentCategory.value : null
            );
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
    onSearchSubmit(): void {
        if (this.isLoading) {
            this.cancelSearch.emit();

            return;
        }

        this.searchSubmit.emit(this.searchFieldValue);

        this._isRefresh = true;
        this._isFocused = false;

        if (this.inputText) {
            this._isSearchDone = true;
        }

        this.closeSuggestionMenu(false);
    }

    /**
     * Sets current category.
     * @hidden
     */
    setCurrentCategory(category: ValueLabelItem): void {
        this._currentCategory = category;
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
        this._outsideClickSubscription = fromEvent<MouseEvent>(document, 'click')
            .pipe(
                filter((event) => {
                    const target = event.target as HTMLElement;
                    return (
                        !!this._suggestionOverlayRef &&
                        !this._suggestionOverlayRef.overlayElement.contains(target) &&
                        this._showDropdown
                    );
                }),
                take(1)
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
        this._isFocused = false;
        this._isSearchDone = false;

        this.closeSuggestionMenu(false);
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
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            width: this.inputGroup.nativeElement.offsetWidth
        });
    }

    /** @hidden */
    _initializeDataSource(dataSource: SearchFieldDataSource<any>): void {
        this._dataSourceSubscription = dataSource.open().subscribe((data) => {
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
        this._suggestionSubscription = this._dropdownValues$.subscribe((suggestions) => {
            suggestions?.forEach((suggestion) => {
                if (this.inputText && suggestion?.toLowerCase().indexOf(this.inputText?.trim()?.toLowerCase()) > -1) {
                    count++;
                }
            });
        });

        return count;
    }

    /** @hidden */
    private _listenElementEvents(): void {
        fromEvent(this._elementRef.nativeElement, 'focus', { capture: true })
            .pipe(
                map((event: MouseEvent) => {
                    const target = event.target as HTMLElement;
                    if (!target.id || target.id.includes('fd-button-bar-id')) {
                        return;
                    }

                    this._isFocused = true;
                    this._cd.markForCheck();
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe();
        fromEvent(this._elementRef.nativeElement, 'blur', { capture: true })
            .pipe(
                tap(() => {
                    this._isFocused = false;
                    this._cd.markForCheck();
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe();
    }

    /** @hidden */
    private _updateSearchAnnoucementText(): void {
        // create search suggestion message with count.
        const suggestionCount = this._getSuggestionsLength();
        this._currentSearchSuggestionAnnoucementMessage =
            suggestionCount +
            this.searchSuggestionMessage +
            (suggestionCount > 0 ? this.searchSuggestionNavigateMessage : '');
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
    transform(values: string[], match: string, mobile = false): string[] {
        return mobile && !match
            ? values
            : (values || []).filter((value) => value.toLowerCase().indexOf(match?.trim().toLowerCase()) > -1);
    }
}
