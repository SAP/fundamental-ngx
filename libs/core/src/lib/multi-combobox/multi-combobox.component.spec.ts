import { A } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Type } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isSelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { ContentDensityMode, mockedLocalContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';

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
        { name: 'Spinach', type: 'Vegetables' }
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

    it('should be able to see Secondary Column', () => {
        component.showSecondaryText = true;

        // component.dataSourceDirective.dataSource = [...component.dataSourceDirective.dataSource];
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

        expect(component._selectedSuggestions.length).toEqual(
            (component.dataSourceDirective.dataSource as any[]).length
        );

        overlayContainerEl.querySelector('.fd-list__item')?.dispatchEvent(unselectEvent);
        fixture.detectChanges();

        expect(component._selectedSuggestions.length).toEqual(0);
    });

    it('should not open dropdown when openDropdownOnAddOnClicked is false', () => {
        jest.spyOn(component.addOnButtonClicked, 'emit');
        jest.spyOn(component, '_showList');
        component.openDropdownOnAddOnClicked = false;
        component._addOnClicked(new MouseEvent('click'));
        expect(component.addOnButtonClicked.emit).toHaveBeenCalled();
        expect(component._showList).not.toHaveBeenCalled();
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
