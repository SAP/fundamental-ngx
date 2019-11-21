import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent, SearchInput, SuggestionItem, SearchInputSize, ValueLabelItem } from './search-input.component';
import { Component, ViewChild } from '@angular/core';
import { ComboboxComponent, ComboboxModule, PopoverModule, MenuModule } from '@fundamental-ngx/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'fdp-test',
    template: `
        <fdp-search-input #component
            [placeholder]="placeholder"
            [suggestions]="suggestions"
            [categories]="categories"
            [categoryLabel]="categoryLabel"
            [hideCategoryLabel]="hideCategoryLabel"
            [size]="size"
            [isLoading]="isLoading"
            [disabled]="disabled"
            (inputChange)="onInputChange($event)"
            (searchSubmit)="onSearchSubmit($event)"
            (cancelSearch)="onCancelSearch($event)"> </fdp-search-input>
    `
})
class TestComponent {
    @ViewChild(SearchInputComponent, { static: true }) component: SearchInputComponent;
    public placeholder: string;
    public suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;
    public categories: ValueLabelItem[];
    public categoryLabel: string;
    public hideCategoryLabel = false;
    public size: SearchInputSize;
    public isLoading = false;
    public disabled = false;

    public inputValue: SearchInput;
    public submitValue: SearchInput;
    public isSearchCanceled = false;

    constructor() { }

    onInputChange($event) {
        this.inputValue = $event;
    }

    onSearchSubmit($event) {
        this.submitValue = $event;
    }

    onCancelSearch($event) {
        this.isSearchCanceled = true;
    }
}

const CATEGORIES: ValueLabelItem[] = [
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Nuts', label: 'Nuts' }
];

describe('SearchInputComponent', () => {
    let component: SearchInputComponent;
    let host: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, SearchInputComponent],
            imports: [CommonModule, FormsModule, ComboboxModule, PopoverModule, MenuModule]
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

    it('should allow "dropdown" string list to be set', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        expect(combobox.dropdownValues.length).toBe(3);
        expect(combobox.dropdownValues[0]).toBe('Apple');
        expect(combobox.dropdownValues[1]).toBe('Banana');
        expect(combobox.dropdownValues[2]).toBe('Carrot');
    });

    it('should allow "dropdown" observable string list to be set', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = of([{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }]);
        fixture.detectChanges();

        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        expect(combobox.dropdownValues.length).toBe(3);
        expect(combobox.dropdownValues[0]).toBe('Apple');
        expect(combobox.dropdownValues[1]).toBe('Banana');
        expect(combobox.dropdownValues[2]).toBe('Carrot');
    });

    it('should show the "category dropdown" if "categories" is set with one or more items', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        fixture.detectChanges();

        const categoryDropdown = fixture.debugElement.queryAll(By.css('.search-input__category-dropdown'));
        expect(categoryDropdown.length).toBe(1);

        const categoryLabel = fixture.debugElement.query(By.css('.search-input__category-label'));
        expect(categoryLabel.nativeElement.textContent).toBe('Category');
    });

    it('should allow the user to set the text of the category label', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Categoría';
        fixture.detectChanges();

        const categoryLabel = fixture.debugElement.query(By.css('.search-input__category-label'));
        expect(categoryLabel.nativeElement.textContent).toBe('Categoría');
    });

    it('should allow the user to hide the category label', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        host.hideCategoryLabel = true;
        fixture.detectChanges();

        const categoryLabel = fixture.debugElement.queryAll(By.css('.search-input__category-label'));
        expect(categoryLabel.length).toBe(0);
    });

    it('should not show the "category dropdown" if "categoryValues" is set with no items', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = [];
        fixture.detectChanges();

        const categoryDropdown = fixture.debugElement.queryAll(By.css('.search-input__category-dropdown'));
        expect(categoryDropdown.length).toBe(0);
    });

    it('should change the category label to the selected category', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        fixture.detectChanges();

        component.setCurrentCategory(CATEGORIES[2]);
        fixture.detectChanges();

        expect(component.currentCategory).toEqual(CATEGORIES[2]);
        let categoryLabel = fixture.debugElement.query(By.css('.search-input__category-label'));
        expect(categoryLabel.nativeElement.textContent).toBe('Nuts');

        component.setCurrentCategory(CATEGORIES[1]);
        fixture.detectChanges();

        expect(component.currentCategory).toEqual(CATEGORIES[1]);
        categoryLabel = fixture.debugElement.query(By.css('.search-input__category-label'));
        expect(categoryLabel.nativeElement.textContent).toBe('Vegetables');
    });

    it('should close dropdown on select of item', () => {
        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        expect(combobox.closeOnSelect).toBeTruthy();
    });

    it('should allow user to set the size of the component', () => {
        let combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        expect(combobox.compact).toBeFalsy();

        host.size = 'small';
        fixture.detectChanges();
        combobox = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        expect(combobox.compact).toBeTruthy();
    });

    it('should open "dropdown" on keyboard entry', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate keyboard entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        expect(combobox.open).toBeTruthy();
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
        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;

        // simulate input entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        // select second item
        combobox.onMenuKeydownHandler(new KeyboardEvent('keydown', {
            code: 'Enter'
        }), 1);
        fixture.detectChanges();
        expect(host.submitValue).toEqual({ text: 'Banana', category: null });
    });

    it('should emit a "searchSubmit" event when user clicks keyboard enter in input field', () => {

        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate input entry
        textInput.nativeElement.value = 'appl';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keydown', { code: 'Enter' });
        fixture.detectChanges();

        expect(host.submitValue).toEqual({ text: 'appl', category: null });
    });

    it('should not emit a "searchSubmit" event when user clicks keyboard enter in input field and the input field is null', () => {

        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate input entry
        textInput.nativeElement.value = '';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keydown', { code: 'Enter' });
        fixture.detectChanges();

        expect(host.submitValue).toBeNull();
    });

    it('should be able to be put into "isLoading" state', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.isLoading = true;
        fixture.detectChanges();

        const wrapper = fixture.debugElement.query(By.css('.search-input'));
        expect(wrapper.classes['is-loading']).toBeTruthy();
    });

    it('should emit a "cancelSearch" event when the user clicks the cancel button while in "loading" state', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.isLoading = true;
        fixture.detectChanges();

        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        expect(host.isSearchCanceled).toBeTruthy();
    });

    it('should have a disabled state', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.disabled = true;
        fixture.detectChanges();

        const combobox: ComboboxComponent = fixture.debugElement.query(By.css('fd-combobox')).componentInstance;
        expect(combobox.disabled).toBeTruthy();

    });

});
