import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
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

import { fromEvent, isObservable, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';

import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { BaseComponent, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';

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
export class SearchFieldComponent extends BaseComponent implements OnInit, OnDestroy {
    /**
     * Place holder text for search input field.
     */
    @Input()
    placeholder: string;

    /**
     * List of string values to populate suggestion dropdown selection.
     */
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
            this.dropdownValues$ = of(dropdownValues);
        } else if (isObservable<SuggestionItem[]>(value)) {
            this.dropdownValues$ = value.pipe(
                map((suggestions: SuggestionItem[]) => {
                    return suggestions.map((suggestion) => suggestion.value);
                })
            );
        } else {
            this.dropdownValues$ = of([]);
        }
    }
    private _suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;

    /**
     * Datasource for suggestion list
     */
    @Input()
    get dataSource(): SearchFieldDataSource<any> {
        return this._dataSource;
    }
    set dataSource(value: SearchFieldDataSource<any>) {
        if (value) {
            this._initializeDataSource(value);
        }
    }
    private _dataSource: SearchFieldDataSource<any>;

    /**
     * Initial input text.
     */
    @Input()
    inputText: string;

    /**
     * List of categories.
     */
    @Input()
    get categories(): ValueLabelItem[] {
        return this._categories;
    }
    set categories(value: ValueLabelItem[]) {
        this._categories = value;
        this.showCategoryDropdown = Array.isArray(value) && value.length > 0;
    }
    private _categories: ValueLabelItem[];

    /**
     * Set label for category dropdown button.
     */
    @Input()
    categoryLabel = 'Category';

    /**
     * Hide display of category label
     */
    @Input()
    hideCategoryLabel = false;

    /**
     * Toggle "loading" mode.
     */
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

    /**
     * Input change event.
     */
    @Output()
    inputChange: EventEmitter<SearchInput> = new EventEmitter();

    /**
     * Search submit event.
     */
    @Output()
    searchSubmit: EventEmitter<SearchInput> = new EventEmitter();

    /**
     * Cancel search event.
     */
    @Output()
    cancelSearch: EventEmitter<SearchInput> = new EventEmitter();

    /** @hidden Focus state */
    get isFocused(): boolean {
        return this._isFocused;
    }

    /**
     * Observable list of string values taken from `suggestions` to populate dropdown menu.
     * @hidden
     */
    public dropdownValues$: Observable<string[]>;

    /**
     * Whether the search input should be displayed in compact mode.
     * @hidden
     */
    public compact = false;

    /**
     * Currently set category.
     * @hidden
     */
    public currentCategory: ValueLabelItem;

    /**
     * Whether or not to show typeahead dropdown.
     * @hidden
     */
    public showDropdown = false;

    /**
     * Whether or not to show category dropdown. This is dependent on length of `categoryValues` property.
     * @hidden
     */
    public showCategoryDropdown = false;

    public inputId = '';
    public submitId = '';
    public menuId = '';
    public dir = 'ltr';

    private _currentSearchSuggestionAnnoucementMessage = '';
    private _suggestionOverlayRef: OverlayRef;
    private _suggestionPortal: TemplatePortal;
    private _suggestionkeyManager: FocusKeyManager<SearchFieldSuggestionDirective>;
    private _isFocused = false;

    private _rtlChangeSubscription = Subscription.EMPTY;
    private _outsideClickSubscription = Subscription.EMPTY;
    private _dataSourceSubscription = Subscription.EMPTY;
    private _suggestionSubscription = Subscription.EMPTY;
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    @ViewChild('categoryDropdown', { static: false }) categoryDropdown: PopoverComponent;
    @ViewChild('inputGroup', { static: false }) inputGroup: ElementRef<HTMLElement>;
    @ViewChild('inputField', { static: false }) inputField: ElementRef<HTMLElement>;

    @ViewChild('suggestionMenuTemplate', { static: false }) suggestionMenuTemplate: TemplateRef<any>;
    @ViewChildren(SearchFieldSuggestionDirective) suggestionItems: QueryList<SearchFieldSuggestionDirective>;

    /** @hidden */
    get searchFieldValue(): SearchInput {
        return {
            text: this.inputText,
            category: this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
        }
    }

    constructor(
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        protected _cd: ChangeDetectorRef,
        @Optional() private _rtl: RtlService,
        private readonly _elementRef: ElementRef,
        private _liveAnnouncer: LiveAnnouncer
    ) {
        super(_cd);
    }

    ngOnInit(): void {
        const baseId = 'fdp-search-field';
        this.inputId = `${baseId}-input-${searchFieldIdCount++}`;
        this.submitId = `${baseId}-submit-${searchFieldIdCount++}`;
        this.menuId = `${baseId}-menu-${searchFieldIdCount++}`;

        if (this._rtl) {
            this._rtlChangeSubscription = this._rtl.rtl.subscribe((isRtl: boolean) => {
                this.dir = isRtl ? 'rtl' : 'ltr';
                this._cd.detectChanges();
            });
        }

        this._listenElementEvents();
    }

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

        this.inputChange.emit(this.searchFieldValue);
        const inputStr: string = event.trim();
        if (inputStr.length === 0) {
            this.closeSuggestionMenu();
            return;
        }
        this.openSuggestionMenu();
        if (this.dataSource) {
            const match = new Map();
            match.set('keyword', inputStr);
            match.set(
                'category',
                this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
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
        this._cd.detectChanges();
    }

    /**
     * Callback function which gets executed on keyboard enter of input text field.
     * @hidden
     */
    onSearchSubmit(): void {
        if (this.isLoading) {
            this.cancelSearch.emit();
        } else {
            this.searchSubmit.emit(this.searchFieldValue);

            this.closeSuggestionMenu();
        }
    }

    /**
     * Sets current category.
     * @hidden
     */
    setCurrentCategory(category: ValueLabelItem): void {
        this.currentCategory = category;
        this.inputChange.emit(this.searchFieldValue);
    }

    /**
     * Open suggestion menu
     */
    openSuggestionMenu(): void {
        this.closeSuggestionMenu();
        this._suggestionkeyManager = new FocusKeyManager(this.suggestionItems);
        if (this.showDropdown) {
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
                        this.showDropdown
                    );
                }),
                take(1)
            )
            .subscribe((event) => {
                const target = event.target as HTMLElement;
                const focus = !(target.tagName === 'INPUT' && this.inputId !== target.id);
                this.closeSuggestionMenu(focus);
            });

        this.showDropdown = true;
    }

    closeSuggestionMenu(focus = true): void {
        if (!this._suggestionOverlayRef) {
            return;
        }
        this._suggestionOverlayRef.detach();
        if (focus) {
            this.inputField.nativeElement.focus();
        }
        this.showDropdown = false;
    }

    clearTextInput(): void {
        this.inputText = '';
        this._cd.detectChanges();
        this.inputChange.emit(this.searchFieldValue);
        this.cancelSearch.emit(this.searchFieldValue);
        this.closeSuggestionMenu();
    }

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

    _initializeDataSource(dataSource: SearchFieldDataSource<any>): void {
        this._dataSourceSubscription = dataSource.open().subscribe((data) => {
            this.dropdownValues$ = of(data);
        });
        this._dataSource = dataSource;
    }

    /**
     * @hidden return count for matching suggestion with input text
     * @returns number
     */
    private _getSuggestionsLength(): number {
        let count = 0;
        this._suggestionSubscription = this.dropdownValues$.subscribe((suggestions) => {
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
                tap(() => {
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
}

@Pipe({
    name: 'suggestionMatches'
})
export class SuggestionMatchesPipe implements PipeTransform {
    transform(values: string[], match: string): string[] {
        return values.filter((value) => value.toLowerCase().indexOf(match?.trim().toLowerCase()) > -1);
    }
}
