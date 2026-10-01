import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MOBILE_MODE_CONFIG, MobileModeConfig, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';

import { ComboboxComponent } from './combobox.component';

interface MobileFruit {
    displayedValue: string;
    value: string;
}

@Component({
    template: `
        <fd-combobox
            [mobile]="true"
            [mobileConfig]="mobileConfig"
            [dropdownValues]="items"
            [communicateByObject]="communicateByObject"
            [displayFn]="displayFn"
            [valueProperty]="valueProperty"
            [closeOnSelect]="closeOnSelect"
            [(ngModel)]="value"
            (ngModelChange)="cvaChanges = cvaChanges + 1"
            (openChange)="openChanges.push($event)"
        ></fd-combobox>
    `,
    imports: [ComboboxComponent, FormsModule]
})
class MobileComboboxHostComponent {
    value: MobileFruit | string | null = '';
    items: Array<MobileFruit | string> = ['Apple', 'Kiwi'];
    communicateByObject = false;
    valueProperty: 'value' | undefined;
    closeOnSelect = true;
    cvaChanges = 0;
    openChanges: boolean[] = [];
    readonly mobileConfig: MobileModeConfig = {
        title: 'Mobile combobox',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };
    displayFn = (item: MobileFruit | string | null): string =>
        typeof item === 'object' && item !== null ? item.displayedValue : (item ?? '');
}

@Component({
    template: `
        <fd-combobox
            [mobile]="true"
            [dropdownValues]="items"
            [closeOnSelect]="closeOnSelect"
            [(ngModel)]="value"
            (ngModelChange)="cvaChanges = cvaChanges + 1"
            (openChange)="openChanges.push($event)"
        ></fd-combobox>
    `,
    imports: [ComboboxComponent, FormsModule],
    providers: [
        {
            provide: MOBILE_MODE_CONFIG,
            multi: true,
            useValue: {
                target: MobileModeControl.COMBOBOX,
                config: {
                    title: 'Global mobile combobox',
                    approveButtonText: 'Approve',
                    cancelButtonText: 'Cancel',
                    hasCloseButton: true
                }
            }
        }
    ]
})
class GlobalMobileComboboxHostComponent {
    value = '';
    readonly items = ['Apple', 'Kiwi'];
    closeOnSelect = true;
    cvaChanges = 0;
    openChanges: boolean[] = [];
}

@Component({
    template: `
        <fd-combobox
            [mobile]="true"
            [mobileConfig]="mobileConfig"
            [dropdownValues]="items"
            [formControl]="formControl"
            (openChange)="openChanges.push($event)"
        ></fd-combobox>
    `,
    imports: [ComboboxComponent, ReactiveFormsModule]
})
class ReactiveMobileComboboxHostComponent {
    readonly formControl = new FormControl('Banana', { nonNullable: true });
    readonly items = ['Apple', 'Banana', 'Kiwi'];
    openChanges: boolean[] = [];
    readonly mobileConfig: MobileModeConfig = {
        title: 'Mobile combobox',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };
}

describe('ComboboxComponent', () => {
    let component: ComboboxComponent;
    let fixture: ComponentFixture<ComboboxComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ComboboxComponent]
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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchFn onInputKeydownHandler', () => {
        const searchSpy = jest.spyOn(component, 'searchFn');
        component.open = true;
        const event = {
            key: 'Enter',
            preventDefault: jest.fn(() => {})
        };
        component.onInputKeydownHandler(<any>event);
        expect(searchSpy).toHaveBeenCalled();
        event.key = 'ArrowDown';
        component.onInputKeydownHandler(<any>event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should set inputText', () => {
        jest.spyOn(component, 'onChange');
        component.inputText = 'someValue';
        expect(component.onChange).toHaveBeenCalledWith('someValue');
    });

    it('should write value not on dropdown mode', () => {
        component.writeValue('someValue');
        expect(component.inputText).toBe('someValue');
    });

    it('should reset displayed values', () => {
        component.displayFn = (item: any): string => item.displayedValue;
        component.inputText = 'displayedValue2';
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);
        (<any>component)._resetDisplayedValues();
        expect(component.displayedValues.length).toBe(2);
    });

    it('should registerOnChange and registerOnTouched', () => {
        const fn = (): void => {};
        component.registerOnChange(fn);
        component.registerOnTouched(fn);
        expect(component.onChange).toBe(fn);
        expect(component.onTouched).toBe(fn);
    });

    it('should handle input entry on dropdown mode', () => {
        jest.spyOn(component, 'onChange');
        component.communicateByObject = true;
        component.displayFn = (item: any): string => item?.displayedValue;
        component.onMenuClickHandler(component.dropdownValues[1]);
        expect(component.onChange).toHaveBeenCalledWith(component.dropdownValues[1]);
    });

    it('should handle wrong input entry on dropdown mode', () => {
        jest.spyOn(component, 'onChange');
        component.displayFn = (item: any): string => {
            if (item) {
                return item.displayedValue;
            } else {
                return '';
            }
        };
        component.inputText = 'otherDisplayedValue';
        expect(component.onChange).toHaveBeenCalledWith('otherDisplayedValue');
    });

    it('should call onChange with null when using non-matching input in communicateByObject mode', () => {
        jest.spyOn(component, 'onChange');
        component.communicateByObject = true;
        component.displayFn = (item: any): string => {
            if (item) {
                return item.displayedValue;
            } else {
                return '';
            }
        };
        component.inputText = 'otherDisplayedValue';
        expect(component.onChange).toHaveBeenCalledWith(null);
    });

    it('should handle write value from outside on dropdown mode', () => {
        component.communicateByObject = true;
        component.displayFn = (item: any): string => item.displayedValue;
        component.writeValue({ value: 'value2', displayedValue: 'displayedValue2' });
        expect(component.inputTextValue).toBe('displayedValue2');
    });

    it('should sync native input element value when writeValue is called', () => {
        component.displayFn = (item: any): string => (item ? item.displayedValue : '');

        // Simulate user typing in the input (changes native element directly)
        const nativeInput = component.searchInputElement.nativeElement;
        nativeInput.value = 'user typed text';
        component.inputText = 'user typed text';

        // Now simulate programmatic reset via writeValue
        component.writeValue({ value: 'value', displayedValue: 'displayedValue' });

        // Both the model and native element should be updated
        expect(component.inputTextValue).toBe('displayedValue');
        expect(nativeInput.value).toBe('displayedValue');
    });

    it('should handleSearchTermChange', () => {
        component.dropdownValues = ['value 1', 'value 2'];
        component.inputText = 'input text';
        jest.spyOn(component, 'filterFn');

        component.handleSearchTermChange();

        expect(component.filterFn).toHaveBeenCalledWith(component.dropdownValues, component.inputText);
    });

    it('should handle primaryButtonClick', () => {
        jest.spyOn(component, 'searchFn');
        jest.spyOn(component, 'isOpenChangeHandle');
        component.open = false;
        component.onPrimaryButtonClick();
        expect(component.searchFn).toHaveBeenCalled();
        expect(component.isOpenChangeHandle).toHaveBeenCalledWith(true);
    });

    it('should choose previous element', () => {
        component.open = false;
        jest.spyOn(component, 'onMenuClickHandler');
        component.displayFn = (item: any): string => item.displayedValue;
        component.inputTextValue = component.dropdownValues[1].displayedValue;
        component.onInputKeydownHandler(<any>{ stopPropagation: () => {}, preventDefault: () => {}, key: 'ArrowUp' });

        expect(component.onMenuClickHandler).toHaveBeenCalledWith(component.dropdownValues[0]);
    });

    it('should choose next element, when there is nothing chosen', () => {
        component.open = false;
        jest.spyOn(component, 'onMenuClickHandler');
        component.displayFn = (item: any): string => item.displayedValue;
        component.inputTextValue = '';
        component.onInputKeydownHandler(<any>{ stopPropagation: () => {}, preventDefault: () => {}, key: 'ArrowDown' });

        expect(component.onMenuClickHandler).toHaveBeenCalledWith(component.dropdownValues[0]);
    });

    it('should reset displayed values on primary button click', () => {
        component.displayFn = (item: any): string => item.displayedValue;
        component.open = false;
        component.inputText = 'displayedValue2';
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);
        component.onPrimaryButtonClick();
        expect(component.displayedValues.length).toBe(2);
    });

    it('should open and reset displayed values on alt+down', () => {
        component.displayFn = (item: any): string => item.displayedValue;
        component.open = false;
        component.inputText = 'displayedValue2';
        (<any>component)._refreshDisplayedValues();
        expect(component.displayedValues.length).toBe(1);

        component.onInputKeydownHandler(<any>{
            stopPropagation: () => {},
            preventDefault: () => {},
            altKey: true,
            key: 'ArrowDown'
        });

        expect(component.displayedValues.length).toBe(2);
        expect(component.open).toBe(true);
    });

    it('should bring back values, if canceled on mobile mode and dont emit changes', async () => {
        component.mobile = true;

        jest.spyOn(component, 'onChange');

        await fixture.whenStable();

        expect(component.onChange).not.toHaveBeenCalled();

        expect(component.inputText).toEqual('');

        component.dialogDismiss('test');

        expect(component.inputText).toEqual('test');
    });

    it('should emit changes values on approve', async () => {
        component.mobile = true;

        jest.spyOn(component, 'onChange');

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
        component.displayFn = (item: any): string => item?.displayedValue ?? '';
        component.inputText = 'test';
        (<any>component)._cdRef.detectChanges();
        addOns = fixture.nativeElement.querySelectorAll('button');
        expect(addOns.length).toBe(2);
    });

    it('should select item from focus in dropdown but not close dropdown', () => {
        component._itemMousedown = false;
        component.displayFn = (item: any): string => item?.displayedValue ?? '';
        component.isOpenChangeHandle(true);
        jest.spyOn(component.itemClicked, 'emit');
        jest.spyOn(component, 'handleSearchTermChange');
        component.onItemFocused(component.dropdownValues[1]);
        expect(component.itemClicked.emit).toHaveBeenCalledWith({ item: component.dropdownValues[1], index: 1 });
        expect(component.open).toBe(true);
        expect(component.inputTextValue).toBe('displayedValue2');
        expect(component.handleSearchTermChange).not.toHaveBeenCalled();
        expect(component.getValue()).toBe('displayedValue2');
    });

    describe('rendered in shellbar', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(ComboboxComponent);
            component = fixture.componentInstance;
            component.dropdownValues = [
                { value: 'value', displayedValue: 'displayedValue' },
                { value: 'value2', displayedValue: 'displayedValue2' }
            ];
            component.searchFn = () => {};
            component.inShellbar = true;
            fixture.detectChanges();
        });

        it('should add extra classes', () => {
            component.isSearch = true;
            (<any>component)._cdRef.detectChanges();

            const inputGroup = fixture.nativeElement.querySelector('.fd-input-group');
            expect(inputGroup.classList.contains('fd-shellbar__input-group')).toBe(true);

            const input = fixture.nativeElement.querySelector('.fd-input');
            expect(input.classList.contains('fd-shellbar__input-group-input')).toBe(true);

            const addOns = fixture.nativeElement.querySelectorAll('.fd-input-group__addon');
            addOns.forEach((element) => {
                expect(element.classList.contains('fd-shellbar__input-group-addon')).toBe(true);
                const button = element.querySelector('.fd-button');
                expect(button.classList.contains('fd-shellbar__button')).toBe(true);
            });
        });
    });

    it('should update (control) value as well when the user edits the input field', () => {
        const preselected = { value: 'value', displayedValue: 'displayedValue' };
        component.writeValue(preselected);
        expect(component.isSelected(preselected)).toBe(true);
        // user edits the selected value
        component.inputText = 'value43';
        expect(component.isSelected(preselected)).toBe(false);
    });

    describe('communicateByObject', () => {
        const enum Category {
            Fruit = 'Fruit',
            Vegetable = 'Vegetable'
        }
        interface Product {
            name: string;
            uniqueCode: string;
            type: Category;
        }

        let allProducts: Product[] = [];

        beforeEach(() => {
            allProducts = [
                {
                    name: 'Apple',
                    uniqueCode: 'apl',
                    type: Category.Fruit
                },
                {
                    name: 'Mango',
                    uniqueCode: 'mng',
                    type: Category.Fruit
                },
                {
                    name: 'Orange',
                    uniqueCode: 'org',
                    type: Category.Fruit
                },
                {
                    name: 'Carrot',
                    uniqueCode: 'crt',
                    type: Category.Vegetable
                },
                {
                    name: 'Tomato',
                    uniqueCode: 'tmt',
                    type: Category.Vegetable
                },
                {
                    name: 'Chilli',
                    uniqueCode: 'chl',
                    type: Category.Vegetable
                }
            ];
        });

        it('should set the selected value from drop down and trigger onChange event with the selected option', () => {
            jest.spyOn(component, 'onChange');

            component.displayFn = (product: Product): string => product?.name ?? '';

            component.communicateByObject = true;

            component.dropdownValues = allProducts;

            component.groupFn = (products: Product[]) => {
                const productTypes: Record<string, Product[]> = {
                    [Category.Fruit]: [],
                    [Category.Vegetable]: []
                };

                products.forEach((product) => {
                    productTypes[product.type].push(product);
                });

                return productTypes;
            };

            component.inputText = 'Apple';

            expect(component.onChange).toHaveBeenCalledWith({
                name: 'Apple',
                uniqueCode: 'apl',
                type: Category.Fruit
            });
        });

        it('should set the value as per the search term and trigger onChange event with the search term', () => {
            jest.spyOn(component, 'onChange');

            component.displayFn = (product: Product): string => product?.name ?? '';

            component.dropdownValues = allProducts;

            component.groupFn = (products: Product[]) => {
                const productTypes: Record<string, Product[]> = {
                    [Category.Fruit]: [],
                    [Category.Vegetable]: []
                };

                products.forEach((product) => {
                    productTypes[product.type].push(product);
                });

                return productTypes;
            };

            component.inputText = 'app';

            expect(component.onChange).toHaveBeenCalledWith('app');
        });

        it('should set the value as blank when search term is empty and trigger onChange event with empty search term', () => {
            jest.spyOn(component, 'onChange');

            component.displayFn = (product: Product): string => product?.name ?? '';

            component.dropdownValues = allProducts;

            component.groupFn = (products: Product[]) => {
                const productTypes: Record<string, Product[]> = {
                    [Category.Fruit]: [],
                    [Category.Vegetable]: []
                };

                products.forEach((product) => {
                    productTypes[product.type].push(product);
                });

                return productTypes;
            };

            component.inputText = '';

            expect(component.onChange).toHaveBeenCalledWith('');
        });
    });

    describe('communicateByObject propagateChange edge cases', () => {
        interface Item {
            displayedValue: string;
            value: string;
        }

        let items: Item[];

        beforeEach(() => {
            fixture = TestBed.createComponent(ComboboxComponent<Item>);
            component = fixture.componentInstance;
            items = [
                { displayedValue: 'Apple', value: 'apple-val' },
                { displayedValue: 'Banana', value: 'banana-val' },
                { displayedValue: 'Cherry', value: 'cherry-val' }
            ];
            component.dropdownValues = items;
            component.communicateByObject = true;
            component.displayFn = (item: Item): string => item?.displayedValue ?? '';
            component.searchFn = () => {};
            fixture.detectChanges();
        });

        it('should emit null when clearing input to empty string', () => {
            jest.spyOn(component, 'onChange');
            component.onMenuClickHandler(items[0]);
            expect(component.onChange).toHaveBeenCalledWith(items[0]);

            (component.onChange as jest.Mock).mockClear();
            component.inputText = '';
            expect(component.onChange).toHaveBeenCalledWith(null);
        });

        it('should emit the full object when input matches an item exactly', () => {
            jest.spyOn(component, 'onChange');
            component.inputText = 'Banana';
            expect(component.onChange).toHaveBeenCalledWith(items[1]);
        });

        it('should emit null when switching from valid selection to non-matching text', () => {
            jest.spyOn(component, 'onChange');
            component.onMenuClickHandler(items[2]);
            expect(component.onChange).toHaveBeenCalledWith(items[2]);

            (component.onChange as jest.Mock).mockClear();
            component.inputText = 'NonExistent';
            expect(component.onChange).toHaveBeenCalledWith(null);
        });

        it('should not emit stale object when multiple items share the same display value', () => {
            const duplicates: Item[] = [
                { displayedValue: 'Apple', value: 'apple-1' },
                { displayedValue: 'Apple', value: 'apple-2' },
                { displayedValue: 'Banana', value: 'banana-val' }
            ];
            component.dropdownValues = duplicates;
            jest.spyOn(component, 'onChange');

            component.inputText = 'Apple';
            // Multiple matches → should NOT emit a single item, should emit current getValue()
            // The key assertion: onChange IS called (contract fulfilled) but NOT with a single stale object
            expect(component.onChange).toHaveBeenCalled();
            const emittedValue = (component.onChange as jest.Mock).mock.calls[0][0];
            // With multiple matches, it should not prematurely pick one item
            expect(emittedValue).not.toEqual(duplicates[0]);
            expect(emittedValue).not.toEqual(duplicates[1]);
        });

        it('should emit extracted property value when valueProperty is set and input matches', () => {
            jest.spyOn(component, 'onChange');
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            component.inputText = 'Cherry';
            expect(component.onChange).toHaveBeenCalledWith('cherry-val');
        });

        it('should emit null when valueProperty is set and input does not match', () => {
            jest.spyOn(component, 'onChange');
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            component.inputText = 'Grape';
            expect(component.onChange).toHaveBeenCalledWith(null);
        });

        it('should not duplicate emissions when setting inputText to the same non-matching value', () => {
            jest.spyOn(component, 'onChange');
            component.inputText = 'xyz';
            expect(component.onChange).toHaveBeenCalledTimes(1);
            expect(component.onChange).toHaveBeenCalledWith(null);
        });

        it('should emit null via _handleClearSearchTerm when used as search field', () => {
            jest.spyOn(component, 'onChange');
            component.onMenuClickHandler(items[0]);
            (component.onChange as jest.Mock).mockClear();

            component.isSearch = true;
            component.mobile = false;
            fixture.detectChanges();

            (component as any)._handleClearSearchTerm();
            expect(component.onChange).toHaveBeenCalledWith(null);
        });
    });

    it('should pause and unpause focus trap when open changes', () => {
        jest.spyOn((<any>component)._focusTrapService, 'pauseCurrentFocusTrap');
        jest.spyOn((<any>component)._focusTrapService, 'unpauseCurrentFocusTrap');

        component.isOpenChangeHandle(true);
        expect((<any>component)._focusTrapService.pauseCurrentFocusTrap).toHaveBeenCalled();

        component.isOpenChangeHandle(false);
        expect((<any>component)._focusTrapService.unpauseCurrentFocusTrap).toHaveBeenCalled();
    });

    describe('valueProperty', () => {
        interface FruitItem {
            displayedValue: string;
            value: string;
            code?: string;
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(ComboboxComponent<FruitItem>);
            component = fixture.componentInstance;
            const fruits: FruitItem[] = [
                { displayedValue: 'Apple', value: 'AppleValue' },
                { displayedValue: 'Apple 2', value: 'AppleValue2' },
                { displayedValue: 'Banana', value: 'BananaValue' },
                { displayedValue: 'Kiwi', value: 'KiwiValue' },
                { displayedValue: 'Strawberry', value: 'StrawberryValue' },
                { displayedValue: 'Tomato', value: 'TomatoValue' }
            ];
            component.dropdownValues = fruits;
            component.communicateByObject = true;
            component.displayFn = (item: FruitItem): string => item?.displayedValue ?? '';
            fixture.detectChanges();
        });

        it('should extract property value when valueProperty is specified and item is selected', () => {
            jest.spyOn(component, 'onChange');
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            const fruits: FruitItem[] = component.dropdownValues as FruitItem[];
            component.onMenuClickHandler(fruits[0]);

            expect(component.onChange).toHaveBeenCalledWith('AppleValue');
            expect(component.getValue()).toBe('AppleValue');
        });

        it('should extract different property when valueProperty is specified', () => {
            jest.spyOn(component, 'onChange');
            const fruits: FruitItem[] = [
                { displayedValue: 'Apple', value: 'AppleValue', code: 'A1' },
                { displayedValue: 'Banana', value: 'BananaValue', code: 'B1' }
            ];
            component.dropdownValues = fruits;
            fixture.componentRef.setInput('valueProperty', 'code');
            fixture.detectChanges();

            component.onMenuClickHandler(fruits[0]);

            expect(component.onChange).toHaveBeenCalledWith('A1');
            expect(component.getValue()).toBe('A1');
        });

        it('should return entire object when valueProperty is not specified', () => {
            jest.spyOn(component, 'onChange');
            fixture.detectChanges();
            fixture.componentRef.setInput('valueProperty', null);

            const fruits: FruitItem[] = component.dropdownValues as FruitItem[];
            component.onMenuClickHandler(fruits[0]);

            expect(component.onChange).toHaveBeenCalledWith(fruits[0]);
            expect(component.getValue()).toBe(fruits[0]);
        });

        it('should find matching object when writeValue is called with property value', () => {
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            component.writeValue('StrawberryValue');

            expect(component.inputText).toBe('Strawberry');
            expect(component.getValue()).toBe('StrawberryValue');
        });

        it('should handle writeValue when no matching object found for property value', () => {
            fixture.componentRef.setInput('valueProperty', 'value');
            component.writeValue('NonExistentValue');

            // Should use the value as-is when no match found
            expect(component.getValue()).toBe('NonExistentValue');
        });

        it('should handle writeValue with different property name', () => {
            const fruits: FruitItem[] = [
                { displayedValue: 'Apple', value: 'AppleValue', code: 'A1' },
                { displayedValue: 'Banana', value: 'BananaValue', code: 'B1' }
            ];
            component.dropdownValues = fruits;
            fixture.componentRef.setInput('valueProperty', 'code');
            fixture.detectChanges();

            component.writeValue('B1');

            expect(component.inputText).toBe('Banana');
            expect(component.getValue()).toBe('B1');
        });

        it('should handle writeValue when valueProperty is null', () => {
            fixture.componentRef.setInput('valueProperty', null);
            fixture.detectChanges();

            const fruits: FruitItem[] = component.dropdownValues as FruitItem[];
            component.writeValue(fruits[0]);

            expect(component.inputText).toBe('Apple');
            expect(component.getValue()).toBe(fruits[0]);
        });

        it('should extract value during propagateChange when item is selected', () => {
            jest.spyOn(component, 'onChange');
            fixture.componentRef.setInput('valueProperty', 'value');
            component.inputText = 'Strawberry';

            (<any>component)._propagateChange();

            expect(component.onChange).toHaveBeenCalledWith('StrawberryValue');
        });

        it('should work correctly with reactive forms pattern', () => {
            jest.spyOn(component, 'onChange');
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            const fruits: FruitItem[] = component.dropdownValues as FruitItem[];
            // Simulate selecting an item
            component.onMenuClickHandler(fruits[4]); // Strawberry

            // Verify the form gets the extracted value, not the entire object
            expect(component.onChange).toHaveBeenCalledWith('StrawberryValue');
            expect(component.getValue()).toBe('StrawberryValue');

            // Simulate form value change from outside (e.g., patchValue)
            component.writeValue('BananaValue');

            // Should find the matching object and display it
            expect(component.inputText).toBe('Banana');
            expect(component.getValue()).toBe('BananaValue');
        });

        it('should handle null/undefined values gracefully', () => {
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            component.writeValue(null);
            expect(component.getValue()).toBe(null);

            component.writeValue(undefined);
            expect(component.getValue()).toBe(undefined);
        });

        it('should ignore valueProperty when communicateByObject is false', () => {
            jest.spyOn(component, 'onChange');
            component.communicateByObject = false;
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();

            component.inputText = 'someValue';

            expect(component.getValue()).toBe('someValue');
        });
    });

    describe('click-outside parity with Tab out', () => {
        interface FruitItem {
            displayedValue: string;
            value: string;
        }

        const kiwiItem: FruitItem = { displayedValue: 'Kiwi', value: 'KiwiValue' };
        const bananaItem: FruitItem = { displayedValue: 'Banana', value: 'BananaValue' };

        /** Sets both the component inputText and the native DOM input value so handleBlur() sees the correct text. */
        function setInputText(cmp: ComboboxComponent, fix: ComponentFixture<ComboboxComponent>, value: string): void {
            cmp.inputText = value;
            const nativeInput = fix.nativeElement.querySelector('input');
            if (nativeInput) {
                nativeInput.value = value;
            }
            fix.detectChanges();
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(ComboboxComponent<FruitItem>);
            component = fixture.componentInstance;
            component.dropdownValues = [kiwiItem, bananaItem];
            component.displayFn = (item: FruitItem): string => item?.displayedValue ?? '';
            component.searchFn = () => {};
            fixture.detectChanges();
        });

        it('1.1 objects mode closeAndSelect: outside-click reverts invalid text to last valid selection (Tab-out parity)', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Select Kiwi — _value = kiwiItem, inputText = 'Kiwi'
            component.onMenuClickHandler(kiwiItem);
            expect(component.getValue()).toBe(kiwiItem);
            expect(component.inputText).toBe('Kiwi');

            // Re-open popover to simulate the state where user types into an open dropdown
            component.isOpenChangeHandle(true);

            // User types invalid text → _value becomes null via _propagateChange
            setInputText(component, fixture, 'Kiwi123');
            expect(component.getValue()).toBeNull();
            expect(component.inputText).toBe('Kiwi123');

            // Simulate click-outside: mousedown on document (outside the combobox host)
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            // Expected (Tab-out parity): inputText reverts to 'Kiwi' (last valid selection) and value restores
            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
        });

        it('1.2 objects mode close strategy: outside-click also reverts invalid text (Tab-out parity)', () => {
            component.communicateByObject = true;
            component.tabOutStrategy = 'close';
            fixture.detectChanges();

            // Select Kiwi — _value = kiwiItem, inputText = 'Kiwi'
            const itemClickedSpy = jest.spyOn(component.itemClicked, 'emit');
            component.onMenuClickHandler(kiwiItem);
            expect(component.getValue()).toBe(kiwiItem);
            itemClickedSpy.mockClear();

            // Re-open and type invalid text
            component.isOpenChangeHandle(true);
            setInputText(component, fixture, 'Kiwi123');
            expect(component.getValue()).toBeNull();

            // Simulate click-outside via mousedown on document
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            // Expected (Tab-out parity with 'close' strategy): inputText reverts to 'Kiwi'
            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
            expect(itemClickedSpy).not.toHaveBeenCalled();
        });

        it('1.3 display-value mode: document mousedown preserves nonmatching custom text', () => {
            // No communicateByObject — _value is always the typed text
            component.dropdownValues = ['Kiwi', 'Banana'];
            component.displayFn = (item: any): string => item ?? '';
            fixture.detectChanges();

            // Select Kiwi
            component.onMenuClickHandler('Kiwi');
            expect(component.getValue()).toBe('Kiwi');

            // Re-open and type extra chars — in display-value mode _value = typed text (truthy)
            component.isOpenChangeHandle(true);
            setInputText(component, fixture, 'Kiwi123');
            expect(component.getValue()).toBe('Kiwi123');

            // The production outside-click subscription closes before blur.
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            // Display-value mode permits free text, so pointer leave must not restore Kiwi.
            expect(component.inputText).toBe('Kiwi123');
            expect(component.getValue()).toBe('Kiwi123');
        });

        it('1.3a close strategy: Tab restores the previous selection without emitting a new selection', () => {
            component.communicateByObject = true;
            component.tabOutStrategy = 'close';
            fixture.detectChanges();

            const itemClickedSpy = jest.spyOn(component.itemClicked, 'emit');
            component.onMenuClickHandler(kiwiItem);
            itemClickedSpy.mockClear();
            component.isOpenChangeHandle(true);
            setInputText(component, fixture, 'Custom');

            component.onInputKeydownHandler(new KeyboardEvent('keydown', { key: 'Tab' }));

            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
            expect(itemClickedSpy).not.toHaveBeenCalled();
        });

        it('1.3b display-value mode: Tab commits the unique completed native autocomplete candidate', () => {
            component.communicateByObject = false;
            fixture.detectChanges();

            setInputText(component, fixture, 'K');
            const nativeInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
            nativeInput.value = 'Kiwi';
            nativeInput.setSelectionRange(1, 4);
            component.isOpenChangeHandle(true);

            component._close();

            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe('Kiwi');
        });

        it('commits a clicked native autocomplete candidate once', () => {
            const onChange = jest.fn();
            const inputTextChange = jest.spyOn(component.inputTextChange, 'emit');
            component.communicateByObject = false;
            component.registerOnChange(onChange);
            fixture.detectChanges();

            setInputText(component, fixture, 'K');
            const nativeInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
            nativeInput.value = 'Kiwi';
            nativeInput.setSelectionRange(1, 4);
            component.isOpenChangeHandle(true);
            onChange.mockClear();
            inputTextChange.mockClear();

            component.onMenuClickHandler(kiwiItem);

            expect(component.inputText).toBe('Kiwi');
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('Kiwi');
            expect(inputTextChange).toHaveBeenCalledTimes(1);
            expect(inputTextChange).toHaveBeenCalledWith('Kiwi');
        });

        it('1.3ba object mode: a completed candidate emits valueProperty exactly once', () => {
            const onChange = jest.fn();
            component.communicateByObject = true;
            fixture.componentRef.setInput('valueProperty', 'value');
            fixture.detectChanges();
            component.registerOnChange(onChange);

            setInputText(component, fixture, 'K');
            onChange.mockClear();
            const nativeInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
            nativeInput.value = 'Kiwi';
            nativeInput.setSelectionRange(1, 4);
            component.isOpenChangeHandle(true);

            component._close();

            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe('KiwiValue');
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('KiwiValue');
        });

        it('1.3c object mode: a duplicate display label does not select an arbitrary object on Tab', () => {
            const firstApple: FruitItem = { displayedValue: 'Apple', value: 'AppleValue' };
            const secondApple: FruitItem = { displayedValue: 'Apple', value: 'AppleValue2' };
            component.communicateByObject = true;
            component.dropdownValues = [kiwiItem, firstApple, secondApple];
            fixture.detectChanges();

            const itemClickedSpy = jest.spyOn(component.itemClicked, 'emit');
            component.onMenuClickHandler(kiwiItem);
            itemClickedSpy.mockClear();
            setInputText(component, fixture, 'A');
            const nativeInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
            nativeInput.value = 'Apple';
            nativeInput.setSelectionRange(1, 5);
            component.isOpenChangeHandle(true);

            component._close();

            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
            expect(itemClickedSpy).not.toHaveBeenCalled();
        });

        it('1.4 should not revert input value when user re-focuses a populated combobox to edit it', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Step 1: user picks Kiwi via item click
            component.onMenuClickHandler(kiwiItem);
            expect(component.getValue()).toBe(kiwiItem);
            expect(component.inputText).toBe('Kiwi');

            // Step 2: user clicks the input to start editing — triggers focus → _syncDomValueToModel
            // Simulate via handleAutoComplete with the existing text (no forceClose)
            component.handleAutoComplete({ term: 'Kiwi', forceClose: false });
            expect(component.inputText).toBe('Kiwi');

            // Step 3: user types '123' appended to the existing text
            component.isOpenChangeHandle(true);
            setInputText(component, fixture, 'Kiwi123');
            // _propagateChange fires — form value becomes null (no match)
            expect(component.getValue()).toBeNull();

            // Step 4: user is still in the field (popover open), mid-edit — NO outside click here.
            // The popover is open; nothing should revert the input.
            expect(component.inputText).toBe('Kiwi123');
        });

        it('1.5 should preserve accepted autocomplete term when forceClose fires', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Prime the native DOM value to match what the AutoCompleteDirective would have written
            // before calling handleAutoComplete — without this, _syncDomValueToModel reads '' and reverts
            setInputText(component, fixture, 'Kiwi');

            // Simulate autocomplete accepting 'Kiwi' with forceClose
            component.handleAutoComplete({ term: 'Kiwi', forceClose: true });

            // inputText must remain 'Kiwi' — the autocomplete acceptance is a controlled close
            // and must NOT trigger _close()'s revert logic
            expect(component.inputText).toBe('Kiwi');
        });

        it('1.6 should not revert input value when user re-focuses a populated combobox to edit it (v3 regression)', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Step 1: pick Kiwi — _value = kiwiItem, inputText = 'Kiwi', DOM = 'Kiwi'
            component.onMenuClickHandler(kiwiItem);
            expect(component.getValue()).toBe(kiwiItem);
            expect(component.inputText).toBe('Kiwi');

            // Step 2: simulate re-focus click on the input
            const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
            inputEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            fixture.detectChanges();

            // Step 3: user types '123' — model stays at 'Kiwi' + '123' = 'Kiwi123'
            // Use setInputText so both model and DOM are in sync (as typing would do)
            setInputText(component, fixture, 'Kiwi123');

            // _propagateChange fires — form value becomes null (no match for 'Kiwi123')
            expect(component.getValue()).toBeNull();

            // inputText must stay 'Kiwi123' — re-focusing must not have reverted it
            expect(component.inputText).toBe('Kiwi123');
        });

        it('1.7 should call _close on mousedown outside the combobox host (v3 outside-click subscription)', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Pick Kiwi, then open popover and set invalid text
            component.onMenuClickHandler(kiwiItem);
            component.isOpenChangeHandle(true);
            setInputText(component, fixture, 'Kiwi123');
            expect(component.getValue()).toBeNull();
            expect(component.open).toBe(true);

            // Dispatch mousedown on document.body — genuine outside-click
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            // _close() should have fired → inputText reverts to 'Kiwi', value reverts to kiwiItem
            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
        });

        it('1.8 should NOT call _close on mousedown inside the combobox host', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Pick Kiwi, then open popover and set invalid text
            component.onMenuClickHandler(kiwiItem);
            component.isOpenChangeHandle(true);
            setInputText(component, fixture, 'Kiwi123');
            expect(component.getValue()).toBeNull();
            expect(component.open).toBe(true);

            // Dispatch mousedown on the combobox's input (inside host)
            const inputEl = fixture.nativeElement.querySelector('input');
            inputEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            // No revert — click was inside the host
            expect(component.inputText).toBe('Kiwi123');
            expect(component.getValue()).toBeNull();
        });

        it('1.9 should revert input on outside-click when popover is already closed (no-match auto-close)', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Step 1: pick Kiwi via item click — _value = kiwiItem, inputText = 'Kiwi'
            component.onMenuClickHandler(kiwiItem);
            expect(component.getValue()).toBe(kiwiItem);
            expect(component.inputText).toBe('Kiwi');

            // Step 2: mimic "user typed Kiwi123 → no matches → popover auto-closed"
            // The popover is already closed; dirty text remains in the input.
            component.open = false;
            setInputText(component, fixture, 'Kiwi123');
            component.displayedValues = [];
            fixture.detectChanges();

            expect(component.open).toBe(false);
            expect(component.inputText).toBe('Kiwi123');
            // _propagateChange set value to null because 'Kiwi123' matches nothing
            expect(component.getValue()).toBeNull();

            // Step 3: user clicks outside — should revert even though popover is already closed
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
        });

        it('1.10 should NOT revert when input already matches the model (no-op dirty gate)', () => {
            component.communicateByObject = true;
            fixture.detectChanges();

            // Pick Kiwi — input is 'Kiwi', _value is kiwiItem, popover closes
            component.onMenuClickHandler(kiwiItem);
            expect(component.getValue()).toBe(kiwiItem);
            expect(component.inputText).toBe('Kiwi');
            expect(component.open).toBe(false);

            // Spy on _close before dispatching — it must NOT be called
            const closeSpy = jest.spyOn(component as any, '_close');

            // Click outside — input matches model, dirty-check must short-circuit
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            fixture.detectChanges();

            expect(closeSpy).not.toHaveBeenCalled();
            expect(component.inputText).toBe('Kiwi');
            expect(component.getValue()).toBe(kiwiItem);
        });
    });
});

describe('ComboboxComponent mobile selection transactions', () => {
    let fixture: ComponentFixture<MobileComboboxHostComponent>;
    let host: MobileComboboxHostComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MobileComboboxHostComponent]
        }).compileComponents();
    }));

    const createHost = async (configure?: (component: MobileComboboxHostComponent) => void): Promise<void> => {
        fixture = TestBed.createComponent(MobileComboboxHostComponent);
        host = fixture.componentInstance;
        configure?.(host);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    };

    const dialog = (): HTMLElement => {
        const element = fixture.nativeElement.querySelector('[role="dialog"]');
        expect(element).toBeTruthy();
        return element as HTMLElement;
    };

    const input = (): HTMLInputElement => {
        const element = fixture.nativeElement.querySelector('input[role="combobox"]');
        expect(element).toBeTruthy();
        return element as HTMLInputElement;
    };

    const combobox = (): ComboboxComponent =>
        fixture.debugElement.query(By.directive(ComboboxComponent)).componentInstance;

    const captureClosingState = (): Array<{
        nativeInputValue: string;
        componentValue: unknown;
        externalValue: MobileFruit | string | null;
        cvaChanges: number;
    }> => {
        const closingStates: Array<{
            nativeInputValue: string;
            componentValue: unknown;
            externalValue: MobileFruit | string | null;
            cvaChanges: number;
        }> = [];
        combobox().openChange.subscribe((isOpen) => {
            if (!isOpen) {
                closingStates.push({
                    nativeInputValue: input().value,
                    componentValue: combobox().getValue(),
                    externalValue: host.value,
                    cvaChanges: host.cvaChanges
                });
            }
        });
        return closingStates;
    };

    const open = async (): Promise<void> => {
        input().click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        dialog();
    };

    const select = (label: string): void => {
        const option = Array.from(dialog().querySelectorAll<HTMLElement>('li[role="option"]')).find(
            (element) => element.textContent?.trim() === label
        );
        expect(option).toBeTruthy();
        option?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        option?.click();
        fixture.detectChanges();
    };

    const clickDialogButton = (label: string): void => {
        const button = Array.from(dialog().querySelectorAll<HTMLButtonElement>('button')).find(
            (element) => element.getAttribute('aria-label') === label || element.textContent?.trim() === label
        );
        expect(button).toBeTruthy();
        button?.click();
        fixture.detectChanges();
    };

    it('keeps a primitive display value as a draft until Approve writes it once', async () => {
        await createHost();
        const closingStates = captureClosingState();
        await open();
        select('Kiwi');

        expect(input().value).toBe('Kiwi');
        expect(host.value).toBe('');
        expect(host.cvaChanges).toBe(0);
        expect(host.openChanges).toEqual([true]);

        clickDialogButton('Approve');

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
        expect(closingStates).toEqual([
            { nativeInputValue: 'Kiwi', componentValue: 'Kiwi', externalValue: 'Kiwi', cvaChanges: 1 }
        ]);
    });

    it('restores a communicateByObject form value after Cancel without emitting the draft', async () => {
        const apple: MobileFruit = { displayedValue: 'Apple', value: 'A1' };
        const kiwi: MobileFruit = { displayedValue: 'Kiwi', value: 'K1' };
        await createHost((component) => {
            component.communicateByObject = true;
            component.items = [apple, kiwi];
            component.value = kiwi;
        });
        await open();
        select('Apple');

        expect(host.value).toBe(kiwi);
        expect(host.cvaChanges).toBe(0);
        expect(host.openChanges).toEqual([true]);

        clickDialogButton('Cancel');

        expect(input().value).toBe('Kiwi');
        expect(host.value).toBe(kiwi);
        expect(host.cvaChanges).toBe(0);
        expect(host.openChanges).toEqual([true, false]);
    });

    it('restores the displayed object and scalar valueProperty form value after Cancel', async () => {
        const apple: MobileFruit = { displayedValue: 'Apple', value: 'A1' };
        const kiwi: MobileFruit = { displayedValue: 'Kiwi', value: 'K1' };
        await createHost((component) => {
            component.communicateByObject = true;
            component.valueProperty = 'value';
            component.items = [apple, kiwi];
            component.value = 'K1';
        });
        await open();
        select('Apple');
        clickDialogButton('Cancel');

        expect(input().value).toBe('Kiwi');
        expect(host.value).toBe('K1');
        expect(host.cvaChanges).toBe(0);
        expect(host.openChanges).toEqual([true, false]);
    });

    it('restores a null initial form value after Cancel without rendering or emitting a draft', async () => {
        await createHost((component) => {
            component.value = null;
        });
        await open();
        select('Apple');
        clickDialogButton('Cancel');

        expect(input().value).toBe('');
        expect(host.value).toBeNull();
        expect(host.cvaChanges).toBe(0);
        expect(host.openChanges).toEqual([true, false]);
        expect(fixture.nativeElement.textContent).not.toContain('null');
        expect(fixture.nativeElement.textContent).not.toContain('undefined');
    });

    it('commits the selected object identity exactly once on Approve', async () => {
        const apple: MobileFruit = { displayedValue: 'Apple', value: 'A1' };
        const kiwi: MobileFruit = { displayedValue: 'Kiwi', value: 'K1' };
        await createHost((component) => {
            component.communicateByObject = true;
            component.items = [apple, kiwi];
        });
        await open();
        select('Apple');
        clickDialogButton('Approve');

        expect(input().value).toBe('Apple');
        expect(host.value).toBe(apple);
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
    });

    it('commits a valueProperty once and restores its confirmed object display on reopen and Cancel', async () => {
        const apple: MobileFruit = { displayedValue: 'Apple', value: 'A1' };
        const kiwi: MobileFruit = { displayedValue: 'Kiwi', value: 'K1' };
        await createHost((component) => {
            component.communicateByObject = true;
            component.valueProperty = 'value';
            component.items = [apple, kiwi];
        });
        await open();
        select('Apple');
        clickDialogButton('Approve');

        expect(input().value).toBe('Apple');
        expect(host.value).toBe('A1');
        expect(host.cvaChanges).toBe(1);

        await open();
        select('Kiwi');
        clickDialogButton('Cancel');

        expect(input().value).toBe('Apple');
        expect(host.value).toBe('A1');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false, true, false]);
    });

    it('treats a whitespace-only Approve label as immediate mode and does not render the action', async () => {
        await createHost((component) => {
            component.mobileConfig.approveButtonText = '   ';
            component.mobileConfig.cancelButtonText = undefined;
            component.closeOnSelect = true;
        });
        await open();
        const actionButtons = dialog().querySelectorAll('fd-button-bar');

        select('Kiwi');

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
        expect(actionButtons).toHaveLength(0);
    });

    it('keeps a Cancel-only selection committed in immediate mode', async () => {
        await createHost((component) => {
            component.mobileConfig.approveButtonText = undefined;
            component.mobileConfig.cancelButtonText = 'Cancel';
            component.closeOnSelect = false;
        });
        await open();
        select('Kiwi');

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true]);

        clickDialogButton('Cancel');

        expect(input().value).toBe('Kiwi');
        expect(combobox().getValue()).toBe('Kiwi');
        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    });

    it('closes the real dialog after an immediate no-Approve selection when closeOnSelect is true', async () => {
        await createHost((component) => {
            component.mobileConfig.approveButtonText = undefined;
            component.mobileConfig.cancelButtonText = undefined;
            component.closeOnSelect = true;
        });
        const closingStates = captureClosingState();
        await open();
        select('Kiwi');

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
        expect(closingStates).toEqual([
            { nativeInputValue: 'Kiwi', componentValue: 'Kiwi', externalValue: 'Kiwi', cvaChanges: 1 }
        ]);
    });

    it('keeps an immediate no-Approve selection after Close when closeOnSelect is false', async () => {
        await createHost((component) => {
            component.mobileConfig.approveButtonText = undefined;
            component.mobileConfig.cancelButtonText = undefined;
            component.closeOnSelect = false;
        });
        await open();
        select('Kiwi');

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true]);

        const closeButton = dialog().querySelector<HTMLButtonElement>('button[title="Close"]');
        expect(closeButton).toBeTruthy();
        closeButton?.click();
        fixture.detectChanges();

        expect(input().value).toBe('Kiwi');
        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
    });

    it('keeps an immediate no-Approve selection after Escape when closeOnSelect is false', async () => {
        await createHost((component) => {
            component.mobileConfig.approveButtonText = undefined;
            component.mobileConfig.cancelButtonText = undefined;
            component.closeOnSelect = false;
        });
        await open();
        select('Kiwi');

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true]);

        dialog().dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
        expect(input().value).toBe('Kiwi');
        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
    });
});

describe('ComboboxComponent global mobile confirmation configuration', () => {
    let fixture: ComponentFixture<GlobalMobileComboboxHostComponent>;
    let host: GlobalMobileComboboxHostComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GlobalMobileComboboxHostComponent]
        }).compileComponents();
    }));

    it('stages a global-only Approve selection until the rendered action commits and closes the dialog', async () => {
        fixture = TestBed.createComponent(GlobalMobileComboboxHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input[role="combobox"]') as HTMLInputElement;
        input.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
        expect(dialog).toBeTruthy();
        const approveButton = Array.from(dialog.querySelectorAll<HTMLButtonElement>('button')).find(
            (element) => element.getAttribute('aria-label') === 'Approve' || element.textContent?.trim() === 'Approve'
        );
        expect(approveButton).toBeTruthy();

        const option = Array.from(dialog.querySelectorAll<HTMLElement>('li[role="option"]')).find(
            (element) => element.textContent?.trim() === 'Kiwi'
        );
        expect(option).toBeTruthy();
        option?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        option?.click();
        fixture.detectChanges();

        const combobox = fixture.debugElement.query(By.directive(ComboboxComponent)).componentInstance;
        expect({
            dialogVisible: !!fixture.nativeElement.querySelector('[role="dialog"]'),
            componentOpen: combobox.open,
            externalValue: host.value,
            cvaChanges: host.cvaChanges,
            openChanges: host.openChanges
        }).toEqual({
            dialogVisible: true,
            componentOpen: true,
            externalValue: '',
            cvaChanges: 0,
            openChanges: [true]
        });

        approveButton?.click();
        fixture.detectChanges();

        expect(host.value).toBe('Kiwi');
        expect(host.cvaChanges).toBe(1);
        expect(host.openChanges).toEqual([true, false]);
        expect(combobox.open).toBe(false);
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    });
});

describe('ComboboxComponent mobile confirmation external writes', () => {
    let fixture: ComponentFixture<ReactiveMobileComboboxHostComponent>;
    let host: ReactiveMobileComboboxHostComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveMobileComboboxHostComponent]
        }).compileComponents();
    }));

    it('retains an external writeValue commit when Cancel discards an open confirmation draft', async () => {
        fixture = TestBed.createComponent(ReactiveMobileComboboxHostComponent);
        host = fixture.componentInstance;
        const cvaChanges: string[] = [];
        host.formControl.valueChanges.subscribe((value) => cvaChanges.push(value));
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input[role="combobox"]') as HTMLInputElement;
        input.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const dialog = (): HTMLElement => {
            const element = fixture.nativeElement.querySelector('[role="dialog"]');
            expect(element).toBeTruthy();
            return element as HTMLElement;
        };
        const option = Array.from(dialog().querySelectorAll<HTMLElement>('li[role="option"]')).find(
            (element) => element.textContent?.trim() === 'Apple'
        );
        expect(option).toBeTruthy();
        option?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        option?.click();
        fixture.detectChanges();

        expect(host.formControl.value).toBe('Banana');
        expect(cvaChanges).toEqual([]);

        host.formControl.setValue('Kiwi', { emitEvent: false });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const combobox = fixture.debugElement.query(By.directive(ComboboxComponent)).componentInstance;
        expect(input.value).toBe('Kiwi');
        expect(combobox.getValue()).toBe('Kiwi');
        expect(host.formControl.value).toBe('Kiwi');
        expect(cvaChanges).toEqual([]);

        const cancelButton = Array.from(dialog().querySelectorAll<HTMLButtonElement>('button')).find(
            (element) => element.getAttribute('aria-label') === 'Cancel' || element.textContent?.trim() === 'Cancel'
        );
        expect(cancelButton).toBeTruthy();
        cancelButton?.click();
        fixture.detectChanges();

        expect(input.value).toBe('Kiwi');
        expect(combobox.getValue()).toBe('Kiwi');
        expect(host.formControl.value).toBe('Kiwi');
        expect(cvaChanges).toEqual([]);
        expect(host.openChanges).toEqual([true, false]);
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    });
});
