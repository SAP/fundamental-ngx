import { A } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Type } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isSelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { ContentDensityMode, mockedLocalContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';

import { By } from '@angular/platform-browser';
import { MultiComboboxComponent } from './multi-combobox.component';
import { MultiComboboxModule } from './multi-combobox.module';

const { contentDensityDirectiveProvider, setContentDensity } = mockedLocalContentDensityDirective(
    ContentDensityMode.COMPACT
);

describe('MultiComboBox component', () => {
    let component: MultiComboboxComponent;
    let fixture: ComponentFixture<MultiComboboxComponent>;
    let overlayContainerEl: HTMLElement;

    const dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' },
        { name: 'Lemon', type: 'Fruits' },
        { name: 'Grapes', type: 'Fruits' },
        { name: 'Watermelon', type: 'Fruits' },
        { name: 'Orange', type: 'Fruits' },
        { name: 'Cucumber', type: 'Vegetables' },
        { name: 'Tomato', type: 'Vegetables' },
        { name: 'Potato', type: 'Vegetables' },
        { name: 'Onion', type: 'Vegetables' },
        { name: 'Mango', type: 'Fruits' },
        { name: 'Kiwi', type: 'Fruits' },
        { name: 'Peach', type: 'Fruits' },
        { name: 'Cherry', type: 'Fruits' }
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MultiComboboxModule],
            providers: [contentDensityDirectiveProvider]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(MultiComboboxComponent);
        component = fixture.componentInstance;

        component.dataSourceDirective.dataSource = dataSource;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to change the contentDensity to "compact"', () => {
        setContentDensity(ContentDensityMode.COMPACT);

        component.open();

        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.classList).toContain('is-compact');
    });

    it('should be able to expand/collapse list if click on onPrimaryButtonClick', () => {
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        let toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(component._suggestions.length);

        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(0);
    });

    it('should list all elements when limitless is true', () => {
        component._setLimitless(true);
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        const dsLength = (component.dataSourceDirective.dataSource as any[]).length;

        expect(component._suggestions.length).toBe(dsLength);

        component._setLimitless(false);
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        if (dsLength > component._getMapLimit()) {
            expect(component._suggestions.length).toBeLessThan(dsLength);
        } else {
            expect(component._suggestions.length).toBe(dsLength);
        }
    });

    it('should be able to see Secondary Column', () => {
        component.showSecondaryText = true;

        fixture.detectChanges();

        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        const secondaryColumns = overlayContainerEl.querySelectorAll('.fd-list__secondary');
        expect(secondaryColumns.length).toBe(component._suggestions.length);
    });

    it('dataSource items should be converted to SelectableOptionItem', () => {
        const item = component._suggestions[0];

        expect(isSelectableOptionItem(item)).toBeTruthy();
    });

    it('should select and unselect an item', () => {
        const item = component._suggestions[0];
        const propagateChangeSpy = jest.spyOn(<any>component, '_propagateChange');

        expect(item.selected).toBe(false);

        component._toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(true);
        expect(component._selectedSuggestions.length).toEqual(1);
        expect(propagateChangeSpy).toHaveBeenCalled();

        component._toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(false);
        expect(component._selectedSuggestions.length).toEqual(0);
        expect(propagateChangeSpy).toHaveBeenCalled();
    });

    it('should select and unselect all items', () => {
        const selectEvent = new KeyboardEvent('keydown', {
            keyCode: A,
            ctrlKey: true
        });
        const unselectEvent = new KeyboardEvent('keydown', {
            keyCode: A,
            ctrlKey: true,
            shiftKey: true
        });

        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();
        overlayContainerEl.querySelector('.fd-list__item')?.dispatchEvent(selectEvent);

        fixture.detectChanges();

        const dsLength = (component.dataSourceDirective.dataSource as any[]).length;

        if (dsLength > component._getMapLimit()) {
            expect(component._selectedSuggestions.length).toBeLessThan(dsLength);
        } else {
            expect(component._selectedSuggestions.length).toBe(dsLength);
        }

        overlayContainerEl.querySelector('.fd-list__item')?.dispatchEvent(unselectEvent);
        fixture.detectChanges();

        expect(component._selectedSuggestions.length).toEqual(0);
    });

    it('should not open dropdown when openDropdownOnAddOnClicked is false', () => {
        const buttonSpy = jest.spyOn(component.addOnButtonClicked, 'emit');
        const showListSpy = jest.spyOn(component, '_showList');
        component.openDropdownOnAddOnClicked = false;
        component._addOnClicked(new MouseEvent('click'));
        expect(buttonSpy).toHaveBeenCalled();
        expect(showListSpy).not.toHaveBeenCalled();
    });

    it('should select item automatically if full match found', async () => {
        component.displayKey = 'name';
        component.inputText = dataSource[2].name;
        component._searchTermChanged(component.inputText);
        fixture.detectChanges();
        await fixture.whenStable();
        component._onBlur(
            new FocusEvent('blur', {
                relatedTarget: fixture.debugElement.query(By.css('.fd-tokenizer__input')).nativeElement
            })
        );
        expect(component._selectedSuggestions.length).toEqual(1);
    });
});

describe('MultiComboBox component CVA', () => {
    runValueAccessorTests({
        /** Component, that is being tested */
        component: MultiComboboxComponent as unknown as Type<Required<ControlValueAccessor>>,
        /**
         * All the metadata required for this test to run.
         * Under the hood calls TestBed.configureTestingModule with provided config.
         */
        testModuleMetadata: {
            imports: [FormsModule, ReactiveFormsModule, MultiComboboxModule]
        },
        hostTemplate: {
            hostComponent: MultiComboboxComponent,
            getTestingComponent: (fixture) => fixture.componentInstance._cva
        },
        /** Whether component is able to track "onBlur" events separately */
        supportsOnBlur: false,
        /**
         * CSS selector for the element, that should dispatch `blur` event.
         * Required and used only if `supportsOnBlur` is set to true.
         */
        nativeControlSelector: 'input.combobox-input',
        /**
         * Tests the correctness of an approach that is used to set value in the component,
         * when the change is internal. It's optional and can be omitted by passing "null"
         */
        internalValueChangeSetter: (fixture, value) => {
            fixture.componentInstance.setValue(value, true);
        },
        /** Function to get the value of a component in a runtime. */
        getComponentValue: (fixture: ComponentFixture<MultiComboboxComponent>) => fixture.componentInstance.value,

        excludeSteps: [CVATestSteps.ValueChangedInternally],

        additionalSetup: (fixture) => {
            fixture.componentInstance.dataSourceDirective.dataSource = [
                { name: 'Apple', type: 'Fruits' },
                { name: 'Banana', type: 'Fruits' },
                { name: 'Pineapple', type: 'Fruits' },
                { name: 'Strawberry', type: 'Fruits' },
                { name: 'Broccoli', type: 'Vegetables' },
                { name: 'Carrot', type: 'Vegetables' },
                { name: 'Jalapeño', type: 'Vegetables' },
                { name: 'Spinach', type: 'Vegetables' }
            ];
        }
    });
});
