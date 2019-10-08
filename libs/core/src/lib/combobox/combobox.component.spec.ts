import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComboboxComponent } from './combobox.component';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { InputGroupModule } from '../input-group/input-group.module';

describe('ComboboxComponent', () => {
    let component: ComboboxComponent;
    let fixture: ComponentFixture<ComboboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComboboxComponent],
            imports: [
                InputGroupModule,
                CommonModule,
                PopoverModule,
                FormsModule,
                MenuModule,
                PipeModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboboxComponent);
        component = fixture.componentInstance;
        component.dropdownValues = [
            { value: 'value', displayedValue: 'displayedValue' },
            { value: 'value2', displayedValue: 'displayedValue2' }
        ];
        component.searchFunction = () => {
        };
        fixture.detectChanges();

        /** That's focus trap testing workaround */
        component.focusTrap = {
            activate: () => {},
            deactivate: () => {},
            pause: () => {},
            unpause: () => {},
        }
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchFunction onInputKeydownHandler', () => {
        spyOn(component, 'searchFunction');
        const event = {
            code: 'Enter',
            preventDefault: () => {
            }
        };
        component.onInputKeydownHandler(event);
        expect(component.searchFunction).toHaveBeenCalled();
        event.code = 'ArrowDown';
        spyOn(event, 'preventDefault');
        spyOn(component.menuItems.first, 'focus');
        component.onInputKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.first.focus).toHaveBeenCalled();
    });

    it('should fire selected event onMenuKeydownHandler, arrow down', () => {
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        const event: any = {
            code: 'Enter',
            preventDefault: () => {}
        };
        spyOn(component, 'onChange');
        component.onMenuKeydownHandler(event, 0);
        expect(component.onChange).toHaveBeenCalledWith(component.dropdownValues[0].displayedValue);
        spyOn(event, 'preventDefault');
        spyOn(component.menuItems.toArray()[1], 'focus');
        event.code = 'ArrowDown';
        component.onMenuKeydownHandler(event, 0);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.toArray()[1].focus).toHaveBeenCalled();
    });

    it('should handle onMenuKeydownHandler, arrow up', () => {
        const event: any = {
            code: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(component.menuItems.first, 'focus');
        spyOn(event, 'preventDefault');
        event.code = 'ArrowUp';
        component.onMenuKeydownHandler(event, 1);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.first.focus).toHaveBeenCalled();
    });

    it('should handle onMenuKeydownHandler, arrow up on the first item', () => {
        const event: any = {
            code: 'ArrowUp',
            preventDefault: () => {
            }
        };
        spyOn(event, 'preventDefault');
        spyOn(component.searchInputElement.nativeElement, 'focus');
        event.code = 'ArrowUp';
        component.onMenuKeydownHandler(event, 0);
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
});
