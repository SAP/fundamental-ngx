import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    ViewChild,
    ChangeDetectionStrategy,
    PipeTransform,
    Pipe,
    ElementRef,
    ViewContainerRef,
    TemplateRef,
    OnDestroy,
    ChangeDetectorRef,
    Directive,
    ViewChildren,
    QueryList
} from '@angular/core';

import { Overlay, OverlayConfig, ConnectedPosition, OverlayRef } from '@angular/cdk/overlay';

import { PopoverComponent } from '@fundamental-ngx/core';
import { Observable, isObservable, of, Subscription, fromEvent } from 'rxjs';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';
import { FocusKeyManager, FocusableOption } from '@angular/cdk/a11y';
import { RtlService } from '@fundamental-ngx/core';
import { SearchFieldDataSource } from '../../domain/public_api';

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
    focus() {
        this.element.nativeElement.focus();
    }
}

let searchFieldIdCount = 0;

@Component({
    selector: 'fdp-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFieldComponent implements OnInit, OnDestroy {
    /**
     * Place holder text for search input field.
     */
    @Input() placeholder: string;

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
    @Input() inputText: string;

    /**
     * Set size of search input component.
     */
    @Input()
    get size(): 'cozy' | 'compact' {
        return this.compact ? 'compact' : 'cozy';
    }
    set size(value: 'cozy' | 'compact') {
        this.compact = value === 'compact';
    }

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
    @Input() categoryLabel = 'Category';

    /**
     * Hide display of category label
     */
    @Input() hideCategoryLabel = false;

    /**
     * Toggle "loading" mode.
     */
    @Input() isLoading = false;

    /**
     * Toggle "disabled" mode.
     */
    @Input() disabled = false;

    /**
     * Input change event.
     */
    @Output() inputChange: EventEmitter<SearchInput> = new EventEmitter();

    /**
     * Search submit event.
     */
    @Output() searchSubmit: EventEmitter<SearchInput> = new EventEmitter();

    /**
     * Cancel search event.
     */
    @Output() cancelSearch: EventEmitter<void> = new EventEmitter();

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

    private _suggestionOverlayRef: OverlayRef;
    private _suggestionPortal: TemplatePortal;
    private _suggestionkeyManager: FocusKeyManager<SearchFieldSuggestionDirective>;

    private _rtlChangeSubscription = Subscription.EMPTY;
    private _outsideClickSubscription = Subscription.EMPTY;
    private _dataSourceSubscription = Subscription.EMPTY;

    @ViewChild('categoryDropdown', { static: false }) categoryDropdown: PopoverComponent;
    @ViewChild('inputGroup', { static: false }) inputGroup: ElementRef<HTMLElement>;
    @ViewChild('inputField', { static: false }) inputField: ElementRef<HTMLElement>;

    @ViewChild('suggestionMenuTemplate', { static: false }) suggestionMenuTemplate: TemplateRef<any>;
    @ViewChildren(SearchFieldSuggestionDirective) suggestionItems: QueryList<SearchFieldSuggestionDirective>;

    constructor(
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _cd: ChangeDetectorRef,
        private _rtl: RtlService
    ) {}

    ngOnInit() {
        const baseId = 'fdp-search-field';
        this.inputId = `${baseId}-input-${searchFieldIdCount++}`;
        this.submitId = `${baseId}-submit-${searchFieldIdCount++}`;
        this.menuId = `${baseId}-menu-${searchFieldIdCount++}`;

        this._rtlChangeSubscription = this._rtl.rtl.subscribe((isRtl: boolean) => {
            this.dir = isRtl ? 'rtl' : 'ltr';
            this._cd.detectChanges();
        });
    }

    ngOnDestroy() {
        if (!!this._suggestionOverlayRef) {
            this._suggestionOverlayRef.dispose();
            this._suggestionOverlayRef = null;
        }
        this._rtlChangeSubscription.unsubscribe();
        this._outsideClickSubscription.unsubscribe();
        this._dataSourceSubscription.unsubscribe();
    }

    onKeydown($event: KeyboardEvent) {
        if (!$event) {
            return;
        }
        const code = $event.key;
        switch (code) {
            case 'Down':
            case 'ArrowDown':
            case 'Up':
            case 'ArrowUp':
                if (this._suggestionkeyManager) {
                    this._suggestionkeyManager.onKeydown($event);
                }
                break;
        }
    }

    /**
     * Capturing value change in input text field of combobox.
     * @hidden
     */
    onValueChange($event: string) {
        if ($event.length > 0) {
            this.openSuggestionMenu();
        } else {
            this.closeSuggestionMenu();
        }
        if (this.dataSource) {
            const match = new Map();
            match.set('keyword', $event);
            match.set(
                'category',
                this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
            );
            this.dataSource.match(match);
        }
        this.inputChange.emit({
            text: $event,
            category: this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
        });
    }

    /**
     * Capturing item selection from dropdown menu of combobox.
     * @hidden
     */
    onItemClick($event: string) {
        this.inputText = $event;
        const searchInput: SearchInput = {
            text: $event,
            category: this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
        };
        this.inputChange.emit(searchInput);
        this.searchSubmit.emit(searchInput);
        this.closeSuggestionMenu();
        this._cd.detectChanges();
    }

    /**
     * Callback function which gets executed on keyboard enter of input text field.
     * @hidden
     */
    onSearchSubmit() {
        if (this.isLoading) {
            this.cancelSearch.emit();
        } else {
            // if there is no input text, don't emit event
            if (!this.inputText) {
                return;
            }

            this.searchSubmit.emit({
                text: this.inputText,
                category: this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
            });

            this.closeSuggestionMenu();
        }
    }

    onCancelSearch() {
        this.cancelSearch.emit();
    }

    /**
     * Sets current category.
     * @hidden
     */
    setCurrentCategory(category: ValueLabelItem) {
        this.currentCategory = category;
        this.inputChange.emit({
            text: this.inputText,
            category: this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
        });
    }

    /**
     * Open suggestion menu
     */
    openSuggestionMenu(): void {
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
                this.closeSuggestionMenu();
            });

        this.showDropdown = true;
    }

    closeSuggestionMenu(): void {
        if (!this._suggestionOverlayRef) {
            return;
        }
        this._suggestionOverlayRef.detach();
        this.inputField.nativeElement.focus();
        this.showDropdown = false;
    }

    openCategoryMenu(): void {}

    clearTextInput(): void {
        this.inputText = '';
        this._cd.detectChanges();
        this.inputChange.emit({
            text: '',
            category: this.currentCategory && this.currentCategory.value ? this.currentCategory.value : null
        });
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

    _initializeDataSource(dataSource: SearchFieldDataSource<any>) {
        this._dataSourceSubscription = dataSource.open().subscribe((data) => {
            this.dropdownValues$ = of(data);
        });
        this._dataSource = dataSource;
    }
}

@Pipe({
    name: 'suggestionMatches'
})
export class SuggestionMatchesPipe implements PipeTransform {
    transform(values: string[], match: string) {
        return values.filter((value) => value.toLowerCase().indexOf(match.toLowerCase()) > -1);
    }
}
