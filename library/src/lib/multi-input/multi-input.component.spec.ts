import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MultiInputComponent } from './multi-input.component';
import { CommonModule } from '@angular/common';
import { TokenModule } from '../token/token.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';

describe('MultiInputComponent', () => {
    let component: MultiInputComponent;
    let fixture: ComponentFixture<MultiInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiInputComponent],
            imports: [CommonModule, TokenModule, FormsModule, MenuModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set placeholder', () => {
        const placeholder = 'placeholder';
        component.placeholder = placeholder;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input').placeholder).toBe(placeholder);
    });

    it('should set max height', () => {
        const height = '100px';
        component.maxHeight = height;
        component.isOpen = true;
        component.ngOnInit();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-popover__body').style.maxHeight).toBe(height);
    });

    it('should handle search term change', () => {
        spyOn(component.searchTermChange, 'emit');
        spyOn(component, 'filterFn');
        component.ngOnInit();

        const text = 'test';
        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.searchTerm).toBe(text);
        expect(component.searchTermChange.emit).toHaveBeenCalled();
        expect(component.filterFn).toHaveBeenCalled();
    });

    it('should filter dropdown values', () => {
        component.dropdownValues = ['test1', 'test2', 'foobar'];
        component.ngOnInit();

        spyOn(component, 'filterFn').and.callThrough();

        const text = 'foo';
        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.filterFn).toHaveBeenCalled();
        expect(component.displayedValues.length).toBe(1);
        expect(component.dropdownValues.length).toBe(3);
    });

    it('should open/close popover on input click', () => {
        component.dropdownValues = ['test1', 'test2', 'foobar'];
        component.ngOnInit();
        component.isOpen = false;

        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.click();
        fixture.detectChanges();
        expect(component.isOpen).toBe(true);

        inputElement.click();
        fixture.detectChanges();

        expect(component.isOpen).toBe(false);
    });

    it('should open/close popover on button click', () => {
        component.dropdownValues = ['test1', 'test2', 'foobar'];
        component.ngOnInit();
        component.isOpen = false;

        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(component.isOpen).toBe(true);

        button.click();
        fixture.detectChanges();

        expect(component.isOpen).toBe(false);
    });

    it('should close popover on document click', () => {
        component.dropdownValues = ['test1', 'test2', 'foobar'];
        component.ngOnInit();
        component.isOpen = true;

        document.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(component.isOpen).toBe(false);
    });

    it('should select values', () => {
        spyOn(component.selectedChange, 'emit');
        spyOn(component, 'onChange');
        spyOn(component, 'handleSelect').and.callThrough();
        component.dropdownValues = ['test1', 'test2', 'foobar'];
        component.ngOnInit();
        component.isOpen = true;
        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('.fd-checkbox');
        checkbox.click();
        fixture.detectChanges();

        expect(component.selected.length).toBe(1);
        expect(component.selected[0]).toBe('test1');
        expect(fixture.nativeElement.querySelector('fd-token')).toBeTruthy();
        expect(component.selectedChange.emit).toHaveBeenCalledWith(component.selected);
        expect(component.onChange).toHaveBeenCalledWith(component.selected);
        expect(component.handleSelect).toHaveBeenCalledWith(checkbox.checked, component.displayedValues[0]);
    });

    it('should de-select values', () => {
        spyOn(component.selectedChange, 'emit');
        spyOn(component, 'onChange');
        spyOn(component, 'handleSelect').and.callThrough();
        component.dropdownValues = ['test1', 'test2', 'foobar'];
        component.ngOnInit();
        component.isOpen = true;
        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('.fd-checkbox');
        checkbox.click();
        fixture.detectChanges();

        expect(component.selected.length).toBe(1);
        expect(component.selected[0]).toBe('test1');

        checkbox.click();
        fixture.detectChanges();

        expect(component.selected.length).toBe(0);
        expect(fixture.nativeElement.querySelector('fd-token')).toBeFalsy();
        expect(component.selectedChange.emit).toHaveBeenCalledWith(component.selected);
        expect(component.onChange).toHaveBeenCalledWith(component.selected);
        expect(component.handleSelect).toHaveBeenCalledWith(checkbox.checked, component.displayedValues[0]);
    });

    it('should handle displaying objects', () => {
        const text = 'test1z1234rt';
        component.dropdownValues = [{name: text}];
        component.ngOnInit();
        component.isOpen = false;
        component.displayFn = (obj: any) => obj.name;
        fixture.detectChanges();

        const menuItem = fixture.nativeElement.querySelector('.fd-menu__item');
        expect(menuItem.innerHTML).toContain(text);

        const checkbox = fixture.nativeElement.querySelector('.fd-checkbox');
        checkbox.click();
        fixture.detectChanges();

        expect(component.selected.length).toBe(1);
        expect(component.selected[0]).toEqual({name: text});
    });

});
