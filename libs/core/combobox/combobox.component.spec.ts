import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComboboxComponent } from './combobox.component';

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

    it('should not call onChange when using wrong input entry on dropdown mode with communicateByObject', () => {
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
        expect(component.onChange).not.toHaveBeenCalled();
    });

    it('should handle write value from outside on dropdown mode', () => {
        component.communicateByObject = true;
        component.displayFn = (item: any): string => item.displayedValue;
        component.writeValue({ value: 'value2', displayedValue: 'displayedValue2' });
        expect(component.inputTextValue).toBe('displayedValue2');
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
});
