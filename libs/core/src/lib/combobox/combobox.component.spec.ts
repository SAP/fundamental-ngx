import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComboboxComponent } from './combobox.component';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';
import { ListModule } from '../list/list.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ButtonModule } from '../button/button.module';

describe('ComboboxComponent', () => {
    let component: ComboboxComponent;
    let fixture: ComponentFixture<ComboboxComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ComboboxComponent],
            imports: [InputGroupModule, CommonModule, PopoverModule, FormsModule, ListModule, PipeModule, ButtonModule],
            providers: [DynamicComponentService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboboxComponent);
        component = fixture.componentInstance;
        component.dropdownValues = [
            { value: 'value', displayedValue: 'displayedValue' },
            { value: 'value2', displayedValue: 'displayedValue2' }
        ];
        component.searchFn = () => {
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchFn onInputKeydownHandler', () => {
        spyOn(component, 'searchFn');
        component.open = true;
        const event = {
            key: 'Enter',
            preventDefault: () => {
            }
        };
        component.onInputKeydownHandler(<any>event);
        expect(component.searchFn).toHaveBeenCalled();
        event.key = 'ArrowDown';
        spyOn(event, 'preventDefault');
        component.onInputKeydownHandler(<any>event);
        expect(event.preventDefault).toHaveBeenCalled();
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

        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.inputText = 'displayedValue2';
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);
        (<any>component)._resetDisplayedValues();
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

        component.handleSearchTermChange();

        expect(component.filterFn).toHaveBeenCalledWith(component.dropdownValues, component.inputText);
    });

    it('should handle primaryButtonClick', () => {
        spyOn(component, 'searchFn');
        spyOn(component, 'isOpenChangeHandle');
        component.open = false;
        component.onPrimaryButtonClick();
        expect(component.searchFn).toHaveBeenCalled();
        expect(component.isOpenChangeHandle).toHaveBeenCalledWith(true);
    });

    it('should choose previous element', () => {
        component.open = false;
        spyOn(component, 'onMenuClickHandler');
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.inputTextValue = component.dropdownValues[1].displayedValue;
        component.onInputKeydownHandler(<any>{ stopPropagation: () => {}, preventDefault: () => {}, key: 'ArrowUp' });

        expect(component.onMenuClickHandler).toHaveBeenCalledWith(component.dropdownValues[0]);
    });

    it('should choose next element, when there is nothing chosen', () => {
        component.open = false;
        spyOn(component, 'onMenuClickHandler');
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.inputTextValue = null;
        component.onInputKeydownHandler(<any>{ stopPropagation: () => {}, preventDefault: () => {}, key: 'ArrowDown' });

        expect(component.onMenuClickHandler).toHaveBeenCalledWith(component.dropdownValues[0]);
    });

    it('should reset displayed values on primary button click', () => {
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.open = false;
        component.inputText = 'displayedValue2';
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);
        component.onPrimaryButtonClick();
        expect(component.displayedValues.length).toBe(2);
    });

    it('should open and reset displayed values on alt+down', () => {
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.open = false;
        component.inputText = 'displayedValue2';
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);

        component.onInputKeydownHandler(<any>
            { stopPropagation: () => {}, preventDefault: () => {}, altKey: true, key: 'ArrowDown' }
        );

        expect(component.displayedValues.length).toBe(2);
        expect(component.open).toBe(true);
    });

    it('should bring back values, if canceled on mobile mode and dont emit changes', async () => {
        component.mobile = true;

        spyOn(component, 'onChange');

        await fixture.whenStable();

        expect(component.onChange).not.toHaveBeenCalled();

        expect(component.inputText).toEqual(undefined);

        component.dialogDismiss('test');

        expect(component.inputText).toEqual('test');
    });

    it('should emit changes values on approve', async () => {
        component.mobile = true;

        spyOn(component, 'onChange');

        await fixture.whenStable();

        component.inputText = 'test';

        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.inputText).toEqual('test');

        component.dialogApprove();

        expect(component.onChange).toHaveBeenCalled();
        expect(component.inputText).toEqual('test');
    });

    it('should change the addon to search when combobox is used as search field', () => {
        component.isSearch = true;
        expect(component.glyphValue).toBe('search');
    });

    it('should render two buttons when combobox is used as search field and there is input text', () => {
        let addOns = fixture.nativeElement.querySelectorAll('button');
        expect(addOns.length).toBe(1);
        component.isSearch = true;
        component.communicateByObject = true;
        component.displayFn = (item: any): string => {
            return item.displayedValue;
        };
        component.inputText = 'displayedValue2';
        (<any>component)._cdRef.detectChanges();
        addOns = fixture.nativeElement.querySelectorAll('button');
        expect(addOns.length).toBe(2);
    });
});
