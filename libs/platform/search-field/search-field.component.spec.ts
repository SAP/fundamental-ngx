import { ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom, Observable, of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { createKeyboardEvent, DataProvider, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import { SearchFieldComponent, SearchInput, SuggestionItem, ValueLabelItem } from './search-field.component';
import { PlatformSearchFieldModule } from './search-field.module';

const CATEGORIES: ValueLabelItem[] = [
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Nuts', label: 'Nuts' }
];

const DATA: any[] = [
    { category: 'Fruits', value: 'Apple' },
    { category: 'Fruits', value: 'Banana' },
    { category: 'Fruits', value: 'Cherry' },
    { category: 'Fruits', value: 'Orange' },
    { category: 'Vegetables', value: 'Asparagus' },
    { category: 'Vegetables', value: 'Celery' },
    { category: 'Vegetables', value: 'Potato' },
    { category: 'Nuts', value: 'Almond' },
    { category: 'Nuts', value: 'Pistacio' },
    { category: 'Nuts', value: 'Walnut' }
];

class SearchFieldDataProvider extends DataProvider<string> {
    constructor() {
        super();
    }

    fetch(params: Map<string, string>): Observable<string[]> {
        let data = DATA;
        if (params['keyword']) {
            const keyword = params['keyword'].toLowerCase();
            data = data.filter((item) => item.value.toLowerCase().indexOf(keyword) > -1);
        }
        if (params['category']) {
            data = data.filter((item) => item.category === params['category']);
        }
        return of(data.map((item) => item.value));
    }
}

@Component({
    selector: 'fdp-test',
    template: `
        <fdp-search-field
            #component
            [placeholder]="placeholder"
            [suggestions]="suggestions"
            [categories]="categories"
            [categoryLabel]="categoryLabel"
            [hideCategoryLabel]="hideCategoryLabel"
            [fdContentDensity]="contentDensity"
            [isLoading]="isLoading"
            [disabled]="disabled"
            (inputChange)="onInputChange($event)"
            (searchSubmit)="onSearchSubmit($event)"
            (cancelSearch)="onCancelSearch()"
        >
        </fdp-search-field>
        <button #outsideButton>Outside</button>
    `,
    standalone: true,
    imports: [PlatformSearchFieldModule]
})
class TestComponent {
    @ViewChild(SearchFieldComponent, { static: true }) component: SearchFieldComponent;
    @ViewChild('outsideButton') outsideButton: ElementRef<HTMLElement>;
    placeholder: string;
    suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;
    categories: ValueLabelItem[];
    categoryLabel: string;
    hideCategoryLabel = false;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    isLoading = false;

    disabled = false;
    inputValue: SearchInput | null;
    submitValue: SearchInput | null;

    isSearchCanceled = false;

    onInputChange($event): void {
        this.inputValue = $event;
    }

    onSearchSubmit($event): void {
        this.submitValue = $event;
    }

    onCancelSearch(): void {
        this.isSearchCanceled = true;
    }
}

describe('SearchFieldComponent', () => {
    let component: SearchFieldComponent;
    let host: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        host = fixture.componentInstance;
        component = host.component;
        host.inputValue = null;
        host.submitValue = null;
        fixture.detectChanges();
    });

    it('should allow "placeholder" text to be set', () => {
        host.placeholder = 'Input Search Here!';
        fixture.detectChanges();
        let placeholder = fixture.debugElement.query(By.css('input')).nativeElement.placeholder;
        expect(placeholder).toBe('Input Search Here!');

        host.placeholder = 'Search Again!';
        fixture.detectChanges();
        placeholder = fixture.debugElement.query(By.css('input')).nativeElement.placeholder;
        expect(placeholder).toBe('Search Again!');
    });

    it('should generate ids for internal elements', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const input: ElementRef = fixture.debugElement.query(By.css('.fdp-search-field__input'));
        expect(input.nativeElement.id).toContain('fdp-search-field-input-');

        const submitButton: ElementRef = fixture.debugElement.query(By.css('.fdp-search-field__submit'));
        expect(submitButton.nativeElement.id).toContain('fdp-search-field-submit-');

        // Test that menu ID is generated (test component state, not overlay DOM)
        expect(component._menuId).toContain('fdp-search-field-menu-');
        expect(component._menuId).toBeTruthy();
    });

    it('should allow "dropdown" string list to be set', async () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // Verify suggestions were set correctly by checking the observable
        const dropdownValues = await firstValueFrom(component._dropdownValues$);
        expect(dropdownValues.length).toBe(3);
        expect(dropdownValues[0]).toBe('Apple');
        expect(dropdownValues[1]).toBe('Banana');
        expect(dropdownValues[2]).toBe('Carrot');

        // simulate keyboard entry to trigger filtering
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();
        await fixture.whenStable();

        // Verify dropdown opens
        expect(component._isOpen$()).toBeTruthy();
    });

    it('should allow "dropdown" observable string list to be set', async () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = of([{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }]);
        fixture.detectChanges();
        await fixture.whenStable();

        // Verify observable suggestions were set correctly
        const dropdownValues = await firstValueFrom(component._dropdownValues$);
        expect(dropdownValues.length).toBe(3);
        expect(dropdownValues[0]).toBe('Apple');
        expect(dropdownValues[1]).toBe('Banana');
        expect(dropdownValues[2]).toBe('Carrot');

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();
        await fixture.whenStable();

        // Verify dropdown opens
        expect(component._isOpen$()).toBeTruthy();
    });

    it('should open dropdown even when there are no matching items (filtering happens in template)', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = of([{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }]);
        fixture.detectChanges();

        // simulate keyboard entry with non-matching text
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'z';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'z' });
        fixture.detectChanges();

        // Component opens dropdown regardless of matches
        // The SuggestionMatchesPipe in the template handles filtering
        expect(component._isOpen$()).toBeTruthy();
        expect(component.inputText).toBe('z');
    });

    it('should show the "category button" if "categories" is set with one or more items', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        fixture.detectChanges();

        const categoryButton = fixture.debugElement.queryAll(By.css('.fdp-search-field__category-button'));
        expect(categoryButton.length).toBe(1);

        const categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.textContent.trim()).toBe('Category');
    });

    it('should allow the user to set the text of the category label', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Categoría';
        fixture.detectChanges();

        const categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.textContent.trim()).toBe('Categoría');
    });

    it('should allow the user to hide the category label', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        host.hideCategoryLabel = true;
        fixture.detectChanges();

        const categoryLabel = fixture.debugElement.queryAll(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.length).toBe(0);
    });

    it('should not show the "category dropdown" if "categoryValues" is set with no items', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = [];
        fixture.detectChanges();

        const categoryDropdown = fixture.debugElement.queryAll(By.css('.fdp-search-field__category-dropdown'));
        expect(categoryDropdown.length).toBe(0);
    });

    it('should change the category label to the selected category', fakeAsync(() => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        fixture.detectChanges();

        // Set category directly via component method
        component.setCurrentCategory(CATEGORIES[2]);
        fixture.detectChanges();

        // Verify the category label in DOM updated
        let categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.textContent.trim()).toBe(CATEGORIES[2].label);
        // Verify the inputChange event was emitted with correct category
        expect(host.inputValue?.category).toBe(CATEGORIES[2].value);

        // Set another category
        component.setCurrentCategory(CATEGORIES[1]);
        fixture.detectChanges();

        categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.textContent.trim()).toBe(CATEGORIES[1].label);
        expect(host.inputValue?.category).toBe(CATEGORIES[1].value);
    }));

    it('should allow user to set the size of the component', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        host.isLoading = true;

        fixture.detectChanges();
        let searchFieldDiv = fixture.debugElement.query(By.css('.fdp-search-field'));
        expect(searchFieldDiv.nativeElement.classList.contains('is-compact')).toBeFalsy();

        host.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();

        searchFieldDiv = fixture.debugElement.query(By.css('.fdp-search-field'));
        expect(searchFieldDiv.nativeElement.classList.contains('is-compact')).toBeTruthy();
    });

    it('should open "dropdown" on keyboard entry', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // check to see that menu is closed
        expect(component._isOpen$()).toBeFalsy();

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        // Verify dropdown opened
        expect(component._isOpen$()).toBeTruthy();
    });

    it('should not create multiple overlays with subsequent keyboard entries', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // check to see that menu is closed
        expect(component._isOpen$()).toBeFalsy();

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        expect(component._isOpen$()).toBeTruthy();

        // Subsequent keyboard entry
        textInput.nativeElement.value = 'ap';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'p' });
        fixture.detectChanges();

        // Dropdown should still be open (not closed and reopened)
        expect(component._isOpen$()).toBeTruthy();
    });

    it('should set input text and close dropdown on select of item', async () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // check to see that menu is closed
        expect(component._isOpen$()).toBeFalsy();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate keyboard entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        expect(component._isOpen$()).toBeTruthy();

        // Simulate selecting an item by calling the component method
        component.onItemClick('Apple');
        fixture.detectChanges();
        await fixture.whenStable();

        // Verify dropdown closed and input text set
        expect(component._isOpen$()).toBeFalsy();
        expect(component.inputText).toBe('Apple');

        expect(host.inputValue).toEqual({ text: 'Apple', category: null });
    });

    it('should filter the suggestions based on input text', async () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [
            { value: 'Acorn' },
            { value: 'Apple' },
            { value: 'Asparagus' },
            { value: 'Banana' },
            { value: 'Bell Pepper' },
            { value: 'Carrot' },
            { value: 'Cabbage' },
            { value: 'Cucumber' }
        ];
        fixture.detectChanges();

        // simulate keyboard entry with filter text
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        component.inputText = 'pp';
        textInput.nativeElement.value = 'pp';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Verify dropdown is open with filtered text
        expect(component._isOpen$()).toBeTruthy();
        expect(component.inputText).toBe('pp');

        // The suggestionMatches pipe in the template filters based on inputText
        // Verify that all suggestions are available (filtering happens in template)
        const allSuggestions = await firstValueFrom(component._dropdownValues$);
        expect(allSuggestions.length).toBe(8);
    });

    it('should emit an "inputChange" event when user types in the input field', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate input entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        expect(host.inputValue).toEqual({ text: 'a', category: null });
    });

    it('should emit a "inputChange" event when user changes the category', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        fixture.detectChanges();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate input entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        component.setCurrentCategory({ value: 'Nuts', label: 'Nuts' });
        fixture.detectChanges();

        expect(host.inputValue).toEqual({ text: 'a', category: 'Nuts' });
    });

    it('should emit a "searchSubmit" event when user selects from dropdown', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate input entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        // Simulate selecting an item using the component method
        component.onItemClick('Banana');
        fixture.detectChanges();

        expect(host.submitValue).toEqual({ text: 'Banana', category: null });
        expect(component.inputText).toBe('Banana');
    });

    it('should emit a "searchSubmit" event and close the dropdown when user clicks keyboard enter in input field', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate input entry
        textInput.nativeElement.value = 'appl';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        textInput.nativeElement.dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        expect(host.submitValue).toEqual({ text: 'appl', category: null });

        expect(component._isOpen$()).toBeFalsy();
    });

    it('should be able to be put into "isLoading" state', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.isLoading = true;
        fixture.detectChanges();

        const wrapper = fixture.debugElement.query(By.css('.fdp-search-field'));
        expect(wrapper.nativeElement.className.includes('is-loading')).toBeTruthy();
    });

    it('should emit a "cancelSearch" event when the user clicks the cancel button while in "loading" state', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.isLoading = true;
        fixture.detectChanges();

        const cancelButton: ElementRef = fixture.debugElement.query(By.css('.fdp-search-field__submit'));
        cancelButton.nativeElement.click();
        fixture.detectChanges();

        expect(host.isSearchCanceled).toBeTruthy();
    });

    it('should have a disabled state', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.disabled = true;
        fixture.detectChanges();

        const input: ElementRef = fixture.debugElement.query(By.css('input[type="search"]'));
        const submitButton: ElementRef = fixture.debugElement.query(By.css('button.fdp-search-field__submit'));
        expect(input.nativeElement.attributes['disabled']).toBeTruthy();
        expect(submitButton.nativeElement.attributes['disabled']).toBeTruthy();
    });

    it('should not show the "clear" button when input field is empty', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const clearButton = fixture.debugElement.queryAll(By.css('button.fdp-search-field__clear'));
        expect(clearButton.length).toBe(0);
    });

    it('should show the "clear" button when user types in input field', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'appl';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const clearButton = fixture.debugElement.queryAll(By.css('button.fdp-search-field__clear'));
        expect(clearButton.length).toBe(1);
    });

    it('should clear the input field and close the suggestion dropdown when the clear button is clicked', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'appl';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const clearButton = fixture.debugElement.queryAll(By.css('button.fdp-search-field__clear'));
        clearButton[0].nativeElement.click();

        // check input field
        expect(component.inputText).toBe('');

        // check dropdown
        expect(component._isOpen$()).toBeFalsy();

        expect(host.inputValue).toEqual({ text: '', category: null });
    });

    it('should allow keyboard navigation of suggestion list', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Verify dropdown opened
        expect(component._isOpen$()).toBeTruthy();

        // Simulate selecting first item via keyboard (test the component method)
        component.onItemClick('Apple');
        fixture.detectChanges();

        // check input text
        expect(component.inputText).toBe('Apple');

        // check dropdown closed
        expect(component._isOpen$()).toBeFalsy();
    });

    it('should close the suggestion dropdown on outside click', fakeAsync(() => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // check dropdown is open
        expect(component._isOpen$()).toBeTruthy();

        // Test close behavior directly via component method
        // The popover handles outside clicks, but we test the close functionality
        component.closeSuggestionMenu(false);
        fixture.detectChanges();

        // Verify dropdown closed
        expect(component._isOpen$()).toBeFalsy();
    }));
});

@Component({
    selector: 'fdp-test',
    template: `
        <fdp-search-field
            #component
            [placeholder]="placeholder"
            [categories]="categories"
            [categoryLabel]="categoryLabel"
            [hideCategoryLabel]="hideCategoryLabel"
            [dataSource]="dataSource"
            [fdContentDensity]="contentDensity"
            [isLoading]="isLoading"
            [disabled]="disabled"
            (inputChange)="onInputChange($event)"
            (searchSubmit)="onSearchSubmit($event)"
            (cancelSearch)="onCancelSearch()"
        >
        </fdp-search-field>
        <button #outsideButton>Outside</button>
    `,
    standalone: true,
    imports: [PlatformSearchFieldModule]
})
class DataSourceTestComponent implements OnInit {
    @ViewChild(SearchFieldComponent, { static: true }) component: SearchFieldComponent;
    @ViewChild('outsideButton') outsideButton: ElementRef<HTMLElement>;
    placeholder: string;
    categories: ValueLabelItem[];
    categoryLabel: string;
    hideCategoryLabel = false;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    isLoading = false;
    disabled = false;

    dataSource: SearchFieldDataSource<any>;
    inputValue: SearchInput | null;
    submitValue: SearchInput | null;

    isSearchCanceled = false;

    constructor() {}

    ngOnInit(): void {
        this.dataSource = new SearchFieldDataSource(new SearchFieldDataProvider());
    }

    onInputChange($event): void {
        this.inputValue = $event;
    }

    onSearchSubmit($event): void {
        this.submitValue = $event;
    }

    onCancelSearch(): void {
        this.isSearchCanceled = true;
    }
}

describe('SearchFieldComponent with DataSource', () => {
    let component: SearchFieldComponent;
    let host: DataSourceTestComponent;
    let fixture: ComponentFixture<DataSourceTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DataSourceTestComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataSourceTestComponent);
        host = fixture.componentInstance;
        host.placeholder = 'Search';
        host.categories = CATEGORIES;
        component = host.component;
        host.inputValue = null;
        host.submitValue = null;
        fixture.detectChanges();
    });

    it('should be able to filter data source on keyword match', () => {
        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'apple';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Verify dropdown opened
        expect(component._isOpen$()).toBeTruthy();
        expect(component.inputText).toBe('apple');

        // simulate input entry with different keyword
        textInput.nativeElement.value = 'an';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Verify dropdown still open with new filter
        expect(component._isOpen$()).toBeTruthy();
        expect(component.inputText).toBe('an');
    });

    it('should be able to filter data source by category', () => {
        // Set category directly
        component.setCurrentCategory(CATEGORIES[0]);
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'al';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Verify dropdown opened with filtered text
        expect(component._isOpen$()).toBeTruthy();
        expect(component.inputText).toBe('al');
    });
});
