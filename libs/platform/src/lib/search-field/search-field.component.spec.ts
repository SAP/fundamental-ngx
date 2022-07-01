import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';
import '@angular/localize/init';
import { Observable, of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/core/utils';
import { createKeyboardEvent, DataProvider, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import { PlatformSearchFieldModule } from './search-field.module';
import { SearchFieldComponent, SearchInput, SuggestionItem, ValueLabelItem } from './search-field.component';

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

function getDropdownItems(menu: Element): NodeList {
    return menu.querySelectorAll('.fd-menu__item');
}

function mouseClickOnElement(el: Element): void {
    const event: MouseEvent = new MouseEvent('click', {
        detail: 1
    });
    el.dispatchEvent(event);
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
            [contentDensity]="contentDensity"
            [isLoading]="isLoading"
            [disabled]="disabled"
            (inputChange)="onInputChange($event)"
            (searchSubmit)="onSearchSubmit($event)"
            (cancelSearch)="onCancelSearch()"
        >
        </fdp-search-field>
        <button #outsideButton>Outside</button>
    `
})
class TestComponent {
    @ViewChild(SearchFieldComponent, { static: true }) component: SearchFieldComponent;
    placeholder: string;
    suggestions: SuggestionItem[] | Observable<SuggestionItem[]>;
    categories: ValueLabelItem[];
    categoryLabel: string;
    hideCategoryLabel = false;
    contentDensity: 'cozy' | 'compact';
    isLoading = false;
    disabled = false;

    inputValue: SearchInput | null;
    submitValue: SearchInput | null;
    isSearchCanceled = false;

    @ViewChild('outsideButton') outsideButton: ElementRef<HTMLElement>;

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

    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PlatformSearchFieldModule],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
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

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        const menuEl = overlayContainerEl.querySelector('.fd-menu') as Element;
        expect(menuEl.id).toContain('fdp-search-field-menu-');
    });

    it('should allow "dropdown" string list to be set', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);

        const items = getDropdownItems(menuEls[0]);
        expect(items.length).toBe(3);
        expect(items[0].textContent).toBe('Apple');
        expect(items[1].textContent).toBe('Banana');
        expect(items[2].textContent).toBe('Carrot');
    });

    it('should allow "dropdown" observable string list to be set', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = of([{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }]);
        fixture.detectChanges();

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);

        const items = getDropdownItems(menuEls[0]);
        expect(items.length).toBe(3);
        expect(items[0].textContent).toBe('Apple');
        expect(items[1].textContent).toBe('Banana');
        expect(items[2].textContent).toBe('Carrot');
    });

    it('should not open the dropdown if there are no matching items', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = of([{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }]);
        fixture.detectChanges();

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'z';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'z' });
        fixture.detectChanges();

        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
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
        expect(categoryLabel.nativeElement.innerText).toBe('Category');
    });

    it('should allow the user to set the text of the category label', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Categoría';
        fixture.detectChanges();

        const categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.innerText).toBe('Categoría');
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

        // click on category button
        const button = fixture.debugElement.query(By.css('.fdp-search-field__category-button'));
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // click on category item
        let menuEl = overlayContainerEl.querySelector('.fd-menu') as Element;
        let items = getDropdownItems(menuEl);
        (items[2] as HTMLElement).click();
        fixture.detectChanges();

        expect(component._currentCategory).toEqual(CATEGORIES[2]);
        let categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.innerText).toBe(CATEGORIES[2].label);
        expect(host.inputValue?.category).toBe(CATEGORIES[2].value);

        // click on category button
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // click on category item
        menuEl = overlayContainerEl.querySelector('.fd-menu') as Element;
        items = getDropdownItems(menuEl);
        (items[1] as HTMLElement).click();
        fixture.detectChanges();

        expect(component._currentCategory).toEqual(CATEGORIES[1]);
        categoryLabel = fixture.debugElement.query(By.css('.fdp-search-field__category-label'));
        expect(categoryLabel.nativeElement.innerText).toBe(CATEGORIES[1].label);
        expect(host.inputValue?.category).toBe(CATEGORIES[1].value);
    }));

    it('should allow user to set the size of the component', () => {
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        host.categories = CATEGORIES;
        host.categoryLabel = 'Category';
        host.isLoading = true;

        fixture.detectChanges();
        let inputField: ElementRef = fixture.debugElement.query(By.css('input.fd-input'));
        let submitButton: ElementRef = fixture.debugElement.query(By.css('button.fdp-search-field__submit'));
        let categoryButton: ElementRef = fixture.debugElement.query(By.css('button.fdp-search-field__category-button'));
        let compactAddons: ElementRef[] = fixture.debugElement.queryAll(By.css('.fd-input-group__addon--compact'));
        expect(inputField.nativeElement.classList.contains('fd-input--compact')).toBeFalsy();
        expect(submitButton.nativeElement.classList.contains('fd-button--compact')).toBeFalsy();
        expect(categoryButton.nativeElement.classList.contains('fd-button--compact')).toBeFalsy();
        expect(compactAddons.length).toBe(0);
        host.contentDensity = 'compact';
        fixture.detectChanges();

        inputField = fixture.debugElement.query(By.css('input.fd-input'));
        submitButton = fixture.debugElement.query(By.css('button.fdp-search-field__submit'));
        categoryButton = fixture.debugElement.query(By.css('button.fdp-search-field__category-button'));
        compactAddons = fixture.debugElement.queryAll(By.css('.fd-input-group__addon--compact'));
        expect(inputField.nativeElement.classList.contains('fd-input--compact')).toBeTruthy();
        expect(submitButton.nativeElement.classList.contains('fd-button--compact')).toBeTruthy();
        expect(categoryButton.nativeElement.classList.contains('fd-button--compact')).toBeTruthy();
        expect(compactAddons.length).toBe(2);
    });

    it('should open "dropdown" on keyboard entry', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // check to see that menu is "hidden"
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();
    });

    it('should not create multiple overlays with subsequent keyboard entries', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // check to see that menu is "hidden"
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();

        textInput.nativeElement.value = 'ap';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'p' });
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();
    });

    it('should set input text and close dropdown on select of item', () => {
        // set type ahead list
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // check to see that menu is "hidden"
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);

        const textInput = fixture.debugElement.query(By.css('input.fd-input'));

        // simulate keyboard entry
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        textInput.triggerEventHandler('keyup', { key: 'a' });
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);

        // click first item
        const items = getDropdownItems(menuEls[0]);
        (items[0] as HTMLElement).click();
        fixture.detectChanges();

        // check to see if dropdown is open
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
        expect(component._showDropdown).toBeFalsy();

        // check input text
        expect(component.inputText).toBe('Apple');

        expect(host.inputValue).toEqual({ text: 'Apple', category: null });
    });

    it('should filter the suggestions based on input text', () => {
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

        // simulate keyboard entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'pp';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);

        const items = getDropdownItems(menuEls[0]);
        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('Apple');
        expect(items[1].textContent).toBe('Bell Pepper');
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

        // select second item
        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        (items[1] as HTMLElement).click();
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

        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
        expect(component._showDropdown).toBeFalsy();
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
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
        expect(component._showDropdown).toBeFalsy();

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

        // simulate keyboard navigation
        let keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown');
        textInput.nativeElement.dispatchEvent(keyboardEvent);

        // simulate keyboard enter
        keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        items[0].dispatchEvent(keyboardEvent);

        // check input text
        expect(component.inputText).toBe('Apple');

        // check dropdown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
        expect(component._showDropdown).toBeFalsy();
    });

    // TODO: flaky test  https://github.com/SAP/fundamental-ngx/issues/7534
    xit('should return focus to the input field after suggestion item is selected', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // simulate keyboard navigation
        let keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown');
        textInput.nativeElement.dispatchEvent(keyboardEvent);

        // simulate keyboard enter
        keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        items[0].dispatchEvent(keyboardEvent);

        // check input text
        expect(component.inputText).toBe('Apple');

        // check focus
        expect(document.activeElement).toBe(textInput.nativeElement);
    });

    it('should close the suggestion dropdown on outside click', () => {
        // set up component
        host.placeholder = 'Search';
        host.suggestions = [{ value: 'Apple' }, { value: 'Banana' }, { value: 'Carrot' }];
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'a';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // check dropdown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();

        /// click outside
        host.outsideButton.nativeElement.click();

        // check dropdown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
        expect(component._showDropdown).toBeFalsy();
    });
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
            [contentDensity]="contentDensity"
            [isLoading]="isLoading"
            [disabled]="disabled"
            (inputChange)="onInputChange($event)"
            (searchSubmit)="onSearchSubmit($event)"
            (cancelSearch)="onCancelSearch()"
        >
        </fdp-search-field>
        <button #outsideButton>Outside</button>
    `
})
class DataSourceTestComponent implements OnInit {
    @ViewChild(SearchFieldComponent, { static: true }) component: SearchFieldComponent;
    placeholder: string;
    categories: ValueLabelItem[];
    categoryLabel: string;
    hideCategoryLabel = false;
    contentDensity: 'cozy' | 'compact';
    isLoading = false;
    disabled = false;
    dataSource: SearchFieldDataSource<any>;

    inputValue: SearchInput | null;
    submitValue: SearchInput | null;
    isSearchCanceled = false;

    @ViewChild('outsideButton') outsideButton: ElementRef<HTMLElement>;

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

    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DataSourceTestComponent],
            imports: [PlatformSearchFieldModule],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
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

        // check dropdown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();
        let items = getDropdownItems(menuEls[0]);
        expect(items.length).toBe(1);
        expect(items[0].textContent).toBe('Apple');

        // simulate input entry
        textInput.nativeElement.value = 'an';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // check dropdown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();
        items = getDropdownItems(menuEls[0]);
        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('Banana');
        expect(items[1].textContent).toBe('Orange');
    });

    it('should be able to filter data source by category', () => {
        // click on category button
        const button = fixture.debugElement.query(By.css('.fdp-search-field__category-button'));
        mouseClickOnElement(button.nativeElement);
        fixture.detectChanges();

        // simulate input entry
        const textInput = fixture.debugElement.query(By.css('input.fd-input'));
        textInput.nativeElement.value = 'al';
        textInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // check dropdown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
        expect(component._showDropdown).toBeTruthy();
        const items = getDropdownItems(menuEls[0]);
        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('Almond');
        expect(items[1].textContent).toBe('Walnut');
    });
});
