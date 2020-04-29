import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComboboxComponent } from './combobox.component';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';
import { ListModule } from '../list/list.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { InputGroupModule } from '../input-group/input-group.module';

describe('ComboboxComponent', () => {
    let component: ComboboxComponent;
    let fixture: ComponentFixture<ComboboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComboboxComponent],
            imports: [InputGroupModule, CommonModule, PopoverModule, FormsModule, ListModule, PipeModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboboxComponent);
        component = fixture.componentInstance;
        component.dropdownValues = [
            { value: 'value', displayedValue: 'displayedValue' },
            { value: 'value2', displayedValue: 'displayedValue2' }
        ];
        component.searchFn = () => {};
        fixture.detectChanges();

        /** That's focus trap testing workaround */
        component.focusTrap = {
            activate: () => {},
            deactivate: () => {},
            pause: () => {},
            unpause: () => {}
        };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchFn onInputKeydownHandler', () => {
        spyOn(component, 'searchFn');
        const event = {
            key: 'Enter',
            preventDefault: () => {}
        };
        component.onInputKeydownHandler(<any>event);
        expect(component.searchFn).toHaveBeenCalled();
        event.key = 'ArrowDown';
        spyOn(event, 'preventDefault');
        spyOn(component.listItems.first, 'focus');
        component.onInputKeydownHandler(<any>event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.listItems.first.focus).toHaveBeenCalled();
    });

    it('should fire selected event onListKeydownHandler, arrow down', () => {
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        const event: any = {
            key: 'Enter',
            preventDefault: () => {}
        };
        spyOn(component, 'onChange');
        component.onListKeydownHandler(event, 0);
        expect(component.onChange).toHaveBeenCalledWith(component.dropdownValues[0].displayedValue);
        spyOn(event, 'preventDefault');
        spyOn(component.listItems.toArray()[1], 'focus');
        event.key = 'ArrowDown';
        component.onListKeydownHandler(event, 0);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.listItems.toArray()[1].focus).toHaveBeenCalled();
    });

    it('should handle onListKeydownHandler, arrow up', () => {
        const event: any = {
            key: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(component.listItems.first, 'focus');
        spyOn(event, 'preventDefault');
        event.key = 'ArrowUp';
        component.onListKeydownHandler(event, 1);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.listItems.first.focus).toHaveBeenCalled();
    });

    it('should handle onListKeydownHandler, arrow up on the first item', () => {
        const event: any = {
            key: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(event, 'preventDefault');
        spyOn(component.searchInputElement.nativeElement, 'focus');
        event.key = 'ArrowUp';
        component.onListKeydownHandler(event, 0);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.searchInputElement.nativeElement.focus).toHaveBeenCalled();
    });

    it('should set inputText', () => {
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        component.inputText = 'someValue';
        expect(component.onChange).toHaveBeenCalledWith('someValue');
        expect(component.onTouched).toHaveBeenCalled();
    });

    it('should write value not on dropdown mode', () => {
        component.writeValue('someValue');
        expect(component.inputText).toBe('someValue');
    });

    it('should reset displayed values', () => {
        component.writeValue('displayedValue2');
        component.inputText = 'displayedValue2';
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);
        component.resetDisplayedValues();
        expect(component.displayedValues.length).toBe(2);
    });

    it('should registerOnChange and registerOnTouched', () => {
        component.registerOnChange('function');
        component.registerOnTouched('function');
        expect(component.onChange).toBe('function');
        expect(component.onTouched).toBe('function');
    });

    it('should handle input entry on dropdown mode', () => {
        spyOn(component, 'onChange');
        component.communicateByObject = true;
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.inputText = 'displayedValue2';
        expect(component.onChange).toHaveBeenCalledWith({ value: 'value2', displayedValue: 'displayedValue2' });
    });

    it('should handle wrong input entry on dropdown mode', () => {
        spyOn(component, 'onChange');
        component.communicateByObject = true;
        component.displayFn = (item: any): string => {
            if (item) {
                return item.displayedValue;
            } else {
                return '';
            }
        };
        component.inputText = 'otherDisplayedValue';
        expect(component.onChange).toHaveBeenCalledWith(undefined);
    });

    it('should handle write value from outside on dropdown mode', () => {
        component.communicateByObject = true;
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.writeValue({ value: 'value2', displayedValue: 'displayedValue2' });
        expect(component.inputTextValue).toBe('displayedValue2');
    });

    it('should handleSearchTermChange', () => {
        component.dropdownValues = ['value 1', 'value 2'];
        component.inputText = 'input text';
        spyOn(component, 'filterFn');
        spyOn(component.popoverComponent, 'updatePopover');

        component.handleSearchTermChange();

        expect(component.filterFn).toHaveBeenCalledWith(component.dropdownValues, component.inputText);
        expect(component.popoverComponent.updatePopover).toHaveBeenCalled();
    });
});
