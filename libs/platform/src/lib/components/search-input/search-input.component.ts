import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ComboboxComponent, ComboboxItem, PopoverComponent } from '@fundamental-ngx/core';
import { Observable, isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

export type SearchInputSize = 'small' | 'medium';

@Component({
    selector: 'fdp-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit, OnChanges, AfterViewInit {
    /**
     * Place holder text for search input field.
     */
    @Input() placeholder: string;

    /**
     * List of string values to populate suggestion dropdown selection.
     */
    @Input() suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;

    /**
     * Initial input text.
     */
    @Input() inputText: string;

    /**
     * Set size of search input component.
     */
    @Input() size: SearchInputSize = 'medium';

    /**
     * List of categories.
     */
    @Input() categories: ValueLabelItem[];

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
     * Whether or not to show category dropdown. This is dependent on length of `categoryValues` property.
     * @hidden
     */
    public showCategoryDropdown = false;

    @ViewChild('combobox') combobox: ComboboxComponent;

    @ViewChild('categoryDropdown') categoryDropdown: PopoverComponent;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.combobox.searchInputElement.nativeElement.setAttribute('type', 'search');
        this.combobox.searchInputElement.nativeElement.disabled = this.isLoading;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.categories) {
            // check to see it we have categories
            this.showCategoryDropdown = changes.categories.currentValue && changes.categories.currentValue.length;
        }
        if (changes.suggestions) {
            if (Array.isArray(changes.suggestions.currentValue)) {
                // convert suggestions to an array of string for "dropdown values"
                const dropdownValues = changes.suggestions.currentValue.map((suggestion: SuggestionItem) => {
                    return suggestion.value;
                });
                this.dropdownValues$ = of(dropdownValues);
            } else if (isObservable<SuggestionItem[]>(changes.suggestions.currentValue)) {
                this.dropdownValues$ = changes.suggestions.currentValue.pipe(map((suggestions: SuggestionItem[]) => {
                    return suggestions.map(suggestion => suggestion.value);
                }));
            } else {
                this.dropdownValues$ = of([]);
            }
        }
        if (changes.size) {
            this.compact = changes.size.currentValue === 'small';
        }
        if (changes.isLoading && this.combobox && this.combobox.searchInputElement) {
            // disable input field while in "loading" state
            if (changes.isLoading.currentValue) {
                this.combobox.searchInputElement.nativeElement.disabled = true;
            } else {
                this.combobox.searchInputElement.nativeElement.disabled = false;
            }
        }
    }

    /**
     * Capturing value change in input text field of combobox.
     * @hidden
     */
    onValueChange($event: string) {
        this.inputChange.emit({
            text: $event,
            category: (this.currentCategory && this.currentCategory.value) ? this.currentCategory.value : null
        });
    }

    /**
     * Capturing item selection from dropdown menu of combobox.
     * @hidden
     */
    onItemClick($event: ComboboxItem) {
        this.searchSubmit.emit({
            text: $event.item,
            category: (this.currentCategory && this.currentCategory.value) ? this.currentCategory.value : null
        });
    }

    /**
     * Callback function which gets executed on keyboard enter of input text field.
     * @hidden
     */
    onSearchSubmit = () => {
        if (this.isLoading) {
            this.cancelSearch.emit();
        } else {
            // close dropdown
            this.combobox.isOpenChangeHandle(false);

            // if there is no input text, don't emit event
            if (!this.inputText) {
                return;
            }

            this.searchSubmit.emit({
                text: this.inputText,
                category: (this.currentCategory && this.currentCategory.value) ? this.currentCategory.value : null
            });
        }
    };

    /**
     * Sets current category.
     * @hidden
     */
    setCurrentCategory(category: ValueLabelItem) {
        this.currentCategory = category;
        this.categoryDropdown.close();
        this.inputChange.emit({
            text: this.inputText,
            category: (this.currentCategory && this.currentCategory.value) ? this.currentCategory.value : null
        });
    }
}
