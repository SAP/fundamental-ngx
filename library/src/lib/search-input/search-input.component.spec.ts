import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';

import { FdSearchPipe, SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
    let component: SearchInputComponent;
    let pipe: FdSearchPipe;
    let fixture: ComponentFixture<SearchInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FdSearchPipe, SearchInputComponent],
            imports: [FormsModule, MenuModule, PopoverModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchInputComponent);
        component = fixture.componentInstance;
        component.dropdownValues = [
            {text: 'Apple', callback: () => {}}
        ];
        component.searchFunction = () => {};
        pipe = new FdSearchPipe();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchFunction onInputKeypressHandler', () => {
        spyOn(component, 'searchFunction');
        const event = {
            code: 'Enter'
        };
        component.onInputKeypressHandler(event);
        expect(component.searchFunction).toHaveBeenCalled();
    });

    it('should call search term callback onMenuKeypressHandler', () => {
        const event = {
            code: 'Enter'
        };
        const term = {
            callback: () => {}
        };
        spyOn(term, 'callback');
        component.onMenuKeypressHandler(event, term);
        expect(term.callback).toHaveBeenCalled();
    });

    it('should set inputText', () => {
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        component.inputText = 'someValue';
        expect(component.onChange).toHaveBeenCalledWith('someValue');
        expect(component.onTouched).toHaveBeenCalled();
    });

    it('should registerOnChange and registerOnTouched', () => {
        component.registerOnChange('function');
        component.registerOnTouched('function');
        expect(component.onChange).toBe('function');
        expect(component.onTouched).toBe('function');
    });

    it('should test the search pipe', () => {
        const searchTerms = [
            {text: 'term1'},
            {text: 'term2'}
        ];
        let result = pipe.transform(searchTerms, 't');
        expect(result).toEqual([
            {text: 'term1'},
            {text: 'term2'}
        ]);
        result = pipe.transform(searchTerms, 'term1');
        expect(result).toEqual([
            {text: 'term1'}
        ]);
    });
});
