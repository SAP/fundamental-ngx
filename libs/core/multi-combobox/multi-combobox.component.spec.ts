import { A } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Type } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

    // Helper to wait for overlay to render after signal-based popover changes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function waitForOverlay(maxAttempts = 20): Promise<boolean> {
        for (let i = 0; i < maxAttempts; i++) {
            fixture.detectChanges();
            await fixture.whenStable();

            // Check for overlay pane first, then check for items
            const overlayPane = document.querySelector('.cdk-overlay-pane');
            const items = overlayContainerEl.querySelectorAll('.fd-list__item');

            if (overlayPane && items.length > 0) {
                return true;
            }
            // Small delay between attempts
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
        return false;
    }

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
        // Initial state - closed
        expect(component.isOpen).toBeFalsy();

        // Click to open
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        const toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(component._suggestions().length);

        // Click to close
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        // Verify closed
        expect(component.isOpen).toBeFalsy();
    });

    it('should list all elements when limitless is true', () => {
        component._setLimitless(true);
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        const dsLength = (component.dataSourceDirective.dataSource as any[]).length;

        expect(component._suggestions().length).toBe(dsLength);

        component._setLimitless(false);
        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        if (dsLength > component._getMapLimit()) {
            expect(component._suggestions().length).toBeLessThan(dsLength);
        } else {
            expect(component._suggestions().length).toBe(dsLength);
        }
    });

    it('should be able to see Secondary Column', () => {
        fixture.componentRef.setInput('showSecondaryText', true);

        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();

        const secondaryColumns = overlayContainerEl.querySelectorAll('.fd-list__secondary');
        expect(secondaryColumns.length).toBe(component._suggestions().length);
    });

    it('dataSource items should be converted to SelectableOptionItem', () => {
        const item = component._suggestions()[0];

        expect(isSelectableOptionItem(item)).toBeTruthy();
    });

    it('should select and unselect an item', () => {
        const item = component._suggestions()[0];
        const propagateChangeSpy = jest.spyOn(<any>component, '_propagateChange');

        expect(item.selected).toBe(false);

        component._toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(true);
        expect(component._selectedSuggestions().length).toEqual(1);
        expect(propagateChangeSpy).toHaveBeenCalled();

        component._toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(false);
        expect(component._selectedSuggestions().length).toEqual(0);
        expect(propagateChangeSpy).toHaveBeenCalled();
    });

    it('should not move focus to search field when deselecting all items', () => {
        const focusToSearchFieldSpy = jest.spyOn(<any>component, '_focusToSearchField');
        const item = component._suggestions()[0];

        // Select an item first
        component._toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(true);
        expect(component._selectedSuggestions().length).toEqual(1);

        // Toggle selection to deselect the only item
        component._toggleSelection(item);
        fixture.detectChanges();

        // Verify item was deselected
        expect(item.selected).toBe(false);
        expect(component._selectedSuggestions().length).toEqual(0);

        // Verify that _focusToSearchField was NOT called
        expect(focusToSearchFieldSpy).not.toHaveBeenCalled();
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
            expect(component._selectedSuggestions().length).toBeLessThan(dsLength);
        } else {
            expect(component._selectedSuggestions().length).toBe(dsLength);
        }

        overlayContainerEl.querySelector('.fd-list__item')?.dispatchEvent(unselectEvent);
        fixture.detectChanges();

        expect(component._selectedSuggestions().length).toEqual(0);
    });

    it('should not open dropdown when openDropdownOnAddOnClicked is false', () => {
        const buttonSpy = jest.spyOn(component.addOnButtonClicked, 'emit');
        const showListSpy = jest.spyOn(component, '_showList');
        fixture.componentRef.setInput('openDropdownOnAddOnClicked', false);
        component._addOnClicked(new MouseEvent('click'));
        expect(buttonSpy).toHaveBeenCalled();
        expect(showListSpy).not.toHaveBeenCalled();
    });

    it('should select item automatically if full match found', async () => {
        fixture.componentRef.setInput('displayKey', 'name');
        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        input.value = dataSource[2].name;
        input.dispatchEvent(new Event('input')); // triggers ngModelChange
        component._searchTermChanged(component.inputText());
        fixture.detectChanges();
        await fixture.whenStable();
        component._onBlur(
            new FocusEvent('blur', {
                relatedTarget: fixture.debugElement.query(By.css('.fd-tokenizer__input')).nativeElement
            })
        );
        expect(component._selectedSuggestions().length).toEqual(1);
    });

    it('should pause and unpause focus trap when opened and closed', () => {
        const pauseFocusTrapSpy = jest.spyOn(component['_focusTrapService'], 'pauseCurrentFocusTrap');
        const unpauseFocusTrapSpy = jest.spyOn(component['_focusTrapService'], 'unpauseCurrentFocusTrap');

        component._popoverOpenChangeHandle(true);
        expect(pauseFocusTrapSpy).toHaveBeenCalled();

        component._popoverOpenChangeHandle(false);
        expect(unpauseFocusTrapSpy).toHaveBeenCalled();
    });

    describe('search after dataSource change', () => {
        const newDataSource = [
            { name: 'Red', type: 'Color' },
            { name: 'Green', type: 'Color' },
            { name: 'Blue', type: 'Color' },
            { name: 'Yellow', type: 'Color' },
            { name: 'Purple', type: 'Color' }
        ];

        beforeEach(() => {
            fixture.componentRef.setInput('displayKey', 'name');
        });

        it('should filter items when searching after dataSource is replaced', () => {
            // Replace data source (simulates async data load, e.g. setTimeout or HTTP)
            component.dataSourceDirective.dataSource = newDataSource;
            fixture.detectChanges();

            // Verify new data loaded
            expect(component._suggestions().length).toBe(newDataSource.length);
            expect(component._suggestions()[0].label).toBe('Red');

            // Now search for "Gr" — should find "Green"
            component._searchTermChanged('Gr');
            fixture.detectChanges();

            const filtered = component._suggestions();
            expect(filtered.length).toBeGreaterThan(0);
            expect(filtered.some((item) => item.label === 'Green')).toBe(true);
        });

        it('should return to full list after clearing search on a replaced dataSource', () => {
            // Replace data source
            component.dataSourceDirective.dataSource = newDataSource;
            fixture.detectChanges();

            // Search
            component._searchTermChanged('Re');
            fixture.detectChanges();
            expect(component._suggestions().some((item) => item.label === 'Red')).toBe(true);

            // Clear search — should show all items again
            component._searchTermChanged('');
            fixture.detectChanges();

            expect(component._suggestions().length).toBe(newDataSource.length);
        });

        it('should filter correctly after multiple dataSource replacements', () => {
            // First replacement
            component.dataSourceDirective.dataSource = newDataSource;
            fixture.detectChanges();

            // Second replacement
            const thirdDataSource = [
                { name: 'Berlin', type: 'City' },
                { name: 'Barcelona', type: 'City' },
                { name: 'Tokyo', type: 'City' }
            ];
            component.dataSourceDirective.dataSource = thirdDataSource;
            fixture.detectChanges();

            // Search on third data source
            component._searchTermChanged('Ber');
            fixture.detectChanges();

            const filtered = component._suggestions();
            expect(filtered.length).toBeGreaterThan(0);
            expect(filtered.some((item) => item.label === 'Berlin')).toBe(true);
            expect(filtered.some((item) => item.label === 'Tokyo')).toBe(false);
        });

        it('should handle replacement with an empty data source', () => {
            // First replace with real data
            component.dataSourceDirective.dataSource = newDataSource;
            fixture.detectChanges();

            expect(component._suggestions().length).toBe(newDataSource.length);

            // Replace with empty array
            component.dataSourceDirective.dataSource = [];
            fixture.detectChanges();

            expect(component._suggestions().length).toBe(0);

            // Replace back with real data — search should still work
            component.dataSourceDirective.dataSource = newDataSource;
            fixture.detectChanges();

            expect(component._suggestions().length).toBe(newDataSource.length);

            component._searchTermChanged('Bl');
            fixture.detectChanges();

            expect(component._suggestions().some((item) => item.label === 'Blue')).toBe(true);
        });
    });
});

describe('MultiComboBox — programmatic selectedItems (#13553)', () => {
    let component: MultiComboboxComponent;
    let fixture: ComponentFixture<MultiComboboxComponent>;
    let overlayContainerEl: HTMLElement;

    const dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' }
    ];

    function getTokenLabels(): string[] {
        return Array.from(fixture.nativeElement.querySelectorAll('fd-token')).map((el) =>
            (el as HTMLElement).textContent!.trim()
        );
    }

    function getSelectedLabels(): string[] {
        return Array.from(overlayContainerEl.querySelectorAll('li.fd-list__item.is-selected[role="option"]')).map(
            (el) => (el as HTMLElement).textContent!.trim()
        );
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MultiComboboxModule]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(MultiComboboxComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('displayKey', 'name');
        component.dataSourceDirective.dataSource = dataSource;
        fixture.detectChanges();
    }));

    it('add (regression): [] → [Apple, Banana] via [selectedItems] without opening dropdown renders tokens', () => {
        fixture.componentRef.setInput('selectedItems', [dataSource[0], dataSource[1]]);
        fixture.detectChanges();

        const labels = getTokenLabels();
        expect(labels).toContain('Apple');
        expect(labels).toContain('Banana');
        expect(labels.length).toBe(2);
    });

    it('replace: [Apple] → [Banana] via [selectedItems] renders only Banana token; reopen shows only Banana checked', async () => {
        fixture.componentRef.setInput('selectedItems', [dataSource[0]]);
        fixture.detectChanges();
        expect(getTokenLabels()).toEqual(['Apple']);

        fixture.componentRef.setInput('selectedItems', [dataSource[1]]);
        fixture.detectChanges();

        const labels = getTokenLabels();
        expect(labels).toEqual(['Banana']);

        // Reopen-state assertion via signal — CDK overlay in jsdom doesn't reliably render
        // is-selected on fd-list-item after a programmatic replace without user interaction.
        const flat = component._fullFlatSuggestions();
        const apple = flat.find((s) => s.label === 'Apple');
        const banana = flat.find((s) => s.label === 'Banana');
        expect(apple?.selected).toBe(false);
        expect(banana?.selected).toBe(true);
    });

    it('clear: [Apple, Banana] → [] via [selectedItems] renders no tokens; reopen shows nothing checked', async () => {
        fixture.componentRef.setInput('selectedItems', [dataSource[0], dataSource[1]]);
        fixture.detectChanges();
        expect(getTokenLabels().length).toBe(2);

        fixture.componentRef.setInput('selectedItems', []);
        fixture.detectChanges();

        expect(getTokenLabels().length).toBe(0);

        component._onPrimaryButtonClick(component.isOpen);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const selectedInOverlay = getSelectedLabels();
        expect(selectedInOverlay.length).toBe(0);
    });
});

@Component({
    template: `<fd-multi-combobox displayKey="name" [formControl]="control"></fd-multi-combobox>`,
    imports: [MultiComboboxModule, ReactiveFormsModule]
})
class MultiComboboxWithFormControlTestComponent {
    control = new FormControl<{ name: string; type: string }[]>([]);
}

describe('MultiComboBox — FormControl.setValue() CVA path (#13553)', () => {
    const formDataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' }
    ];

    let hostFixture: ComponentFixture<MultiComboboxWithFormControlTestComponent>;
    let host: MultiComboboxWithFormControlTestComponent;
    let combobox: MultiComboboxComponent;

    function getTokenLabels(): string[] {
        return Array.from(hostFixture.nativeElement.querySelectorAll('fd-token')).map((el) =>
            (el as HTMLElement).textContent!.trim()
        );
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MultiComboboxModule, MultiComboboxWithFormControlTestComponent]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        hostFixture = TestBed.createComponent(MultiComboboxWithFormControlTestComponent);
        host = hostFixture.componentInstance;
        combobox = hostFixture.debugElement.query(By.directive(MultiComboboxComponent)).componentInstance;
        combobox.dataSourceDirective.dataSource = formDataSource;
        hostFixture.detectChanges();
        // Wait for data source to populate _fullFlatSuggestions
        return hostFixture.whenStable();
    }));

    it('FormControl.setValue() without [selectedItems] binding renders tokens and updates suggestion state', async () => {
        // Precondition: no tokens, no selected suggestions
        expect(getTokenLabels().length).toBe(0);
        expect(combobox._selectedSuggestions().length).toBe(0);

        // Act: programmatic setValue via FormControl (the CVA path — no [selectedItems] binding)
        host.control.setValue([formDataSource[0], formDataSource[1]]);
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();

        // Assert: tokens repaint
        const labels = getTokenLabels();
        expect(labels).toContain('Apple');
        expect(labels).toContain('Banana');
        expect(labels.length).toBe(2);

        // Assert: internal suggestion state consistent
        const flat = combobox._fullFlatSuggestions();
        const apple = flat.find((s) => s.label === 'Apple');
        const banana = flat.find((s) => s.label === 'Banana');
        const pineapple = flat.find((s) => s.label === 'Pineapple');
        expect(apple?.selected).toBe(true);
        expect(banana?.selected).toBe(true);
        expect(pineapple?.selected).toBe(false);
    });
});

@Component({
    template: `<fd-multi-combobox displayKey="name" [formControl]="control"></fd-multi-combobox>`,
    imports: [MultiComboboxModule, ReactiveFormsModule]
})
class MultiComboboxWithPresetFormControlTestComponent {
    readonly formDataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' }
    ];
    control = new FormControl<{ name: string; type: string }[]>([this.formDataSource[0]]);
}

@Component({
    template: `<fd-multi-combobox
        [mobile]="true"
        [mobileConfig]="mobileConfig"
        [formControl]="control"
    ></fd-multi-combobox>`,
    imports: [MultiComboboxModule, ReactiveFormsModule]
})
class MobileMultiComboboxWithPrimitiveFormControlTestComponent {
    readonly mobileConfig = { approveButtonText: 'Approve', cancelButtonText: 'Cancel' };
    readonly formDataSource = ['Apple', 'Banana', 'Pineapple'];
    control = new FormControl<string[]>(['Banana']);
}

@Component({
    template: `
        <fd-multi-combobox
            [mobile]="true"
            [mobileConfig]="mobileConfig"
            [group]="true"
            groupKey="type"
            displayKey="name"
            [formControl]="control"
        ></fd-multi-combobox>
    `,
    imports: [MultiComboboxModule, ReactiveFormsModule]
})
class MobileGroupedMultiComboboxWithFormControlTestComponent {
    readonly mobileConfig = { approveButtonText: 'Approve', cancelButtonText: 'Cancel' };
    readonly formDataSource = [
        { name: 'Apple', type: 'Fruit' },
        { name: 'Banana', type: 'Fruit' },
        { name: 'Broccoli', type: 'Vegetable' }
    ];
    control = new FormControl<{ name: string; type: string }[]>([this.formDataSource[1]]);
}

describe('MultiComboBox mobile dialog cancellation (#13308)', () => {
    let hostFixture: ComponentFixture<
        | MobileMultiComboboxWithPrimitiveFormControlTestComponent
        | MobileGroupedMultiComboboxWithFormControlTestComponent
    >;
    let host:
        | MobileMultiComboboxWithPrimitiveFormControlTestComponent
        | MobileGroupedMultiComboboxWithFormControlTestComponent;
    let combobox: MultiComboboxComponent;

    async function openDialog(): Promise<void> {
        const control = hostFixture.nativeElement.querySelector<HTMLElement>('.fd-multi-combobox fd-input-group');
        expect(control).toBeTruthy();
        control?.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
    }

    function option(label: string): HTMLLIElement | undefined {
        return Array.from(document.querySelectorAll<HTMLLIElement>('li[role="option"]')).find((item) =>
            item.textContent?.includes(label)
        );
    }

    async function toggleOption(label: string): Promise<void> {
        const checkbox = option(label)?.querySelector<HTMLInputElement>('input[type="checkbox"]');
        expect(checkbox).toBeTruthy();
        checkbox?.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
    }

    async function cancelDialog(): Promise<void> {
        const cancel = Array.from(document.querySelectorAll<HTMLButtonElement>('fd-dialog-footer button')).find(
            (button) => button.textContent?.includes('Cancel')
        );
        expect(cancel).toBeTruthy();
        cancel?.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
    }

    async function approveDialog(): Promise<void> {
        const approve = Array.from(document.querySelectorAll<HTMLButtonElement>('fd-dialog-footer button')).find(
            (button) => button.textContent?.includes('Approve')
        );
        expect(approve).toBeTruthy();
        approve?.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
    }

    async function createPrimitiveHost(initialValue: string[]): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MultiComboboxModule,
                MobileMultiComboboxWithPrimitiveFormControlTestComponent
            ]
        }).compileComponents();
        hostFixture = TestBed.createComponent(MobileMultiComboboxWithPrimitiveFormControlTestComponent);
        host = hostFixture.componentInstance;
        host.control.setValue(initialValue);
        combobox = hostFixture.debugElement.query(By.directive(MultiComboboxComponent)).componentInstance;
        combobox.dataSourceDirective.dataSource = host.formDataSource;
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
    }

    function deferSuggestionRefresh(): void {
        jest.spyOn(combobox.dataSourceDirective.dataSourceProvider!, 'match').mockImplementation();
    }

    it('restores the initial primitive selection and does not commit a cancelled mobile draft', async () => {
        await createPrimitiveHost(['Banana']);
        deferSuggestionRefresh();
        const formValues: string[][] = [];
        const selectionChanges: unknown[] = [];
        host.control.valueChanges.subscribe((value) => formValues.push(value ?? []));
        combobox.selectionChange.subscribe((event) => selectionChanges.push(event));

        await openDialog();
        await toggleOption('Apple');
        await cancelDialog();
        await openDialog();

        expect(option('Apple')?.classList.contains('is-selected')).toBe(false);
        expect(option('Apple')?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked).toBe(false);
        expect(option('Banana')?.classList.contains('is-selected')).toBe(true);
        expect(option('Banana')?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked).toBe(true);
        expect(host.control.value).toEqual(['Banana']);
        expect(formValues).toEqual([]);
        expect(selectionChanges).toEqual([]);
    });

    it('clears every primitive option when cancelling a draft from an empty selection', async () => {
        await createPrimitiveHost([]);
        deferSuggestionRefresh();

        await openDialog();
        await toggleOption('Apple');
        await cancelDialog();
        await openDialog();

        for (const label of ['Apple', 'Banana', 'Pineapple']) {
            expect(option(label)?.classList.contains('is-selected')).toBe(false);
            expect(option(label)?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked).toBe(false);
        }
        expect(host.control.value).toEqual([]);
    });

    it('commits an approved mobile draft exactly once', async () => {
        await createPrimitiveHost(['Banana']);
        deferSuggestionRefresh();
        const formValues: string[][] = [];
        const selectionChanges: unknown[] = [];
        host.control.valueChanges.subscribe((value) => formValues.push(value ?? []));
        combobox.selectionChange.subscribe((event) => selectionChanges.push(event));

        await openDialog();
        await toggleOption('Apple');
        await approveDialog();

        expect(host.control.value).toEqual(['Apple', 'Banana']);
        expect(formValues).toEqual([['Apple', 'Banana']]);
        expect(selectionChanges).toHaveLength(1);
    });

    it('restores selected flags for grouped object options when cancelling a mobile draft', async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MultiComboboxModule,
                MobileGroupedMultiComboboxWithFormControlTestComponent
            ]
        }).compileComponents();
        hostFixture = TestBed.createComponent(MobileGroupedMultiComboboxWithFormControlTestComponent);
        host = hostFixture.componentInstance;
        combobox = hostFixture.debugElement.query(By.directive(MultiComboboxComponent)).componentInstance;
        combobox.dataSourceDirective.dataSource = host.formDataSource;
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
        deferSuggestionRefresh();

        await openDialog();
        await toggleOption('Apple');
        await cancelDialog();
        await openDialog();

        expect(option('Apple')?.classList.contains('is-selected')).toBe(false);
        expect(option('Banana')?.classList.contains('is-selected')).toBe(true);
        expect(option('Broccoli')?.classList.contains('is-selected')).toBe(false);
        expect(host.control.value?.map((item) => item.name)).toEqual(['Banana']);
    });
});

describe('MultiComboBox — token removal keeps the open menu in sync (#13308)', () => {
    let hostFixture: ComponentFixture<MultiComboboxWithPresetFormControlTestComponent>;
    let host: MultiComboboxWithPresetFormControlTestComponent;
    let combobox: MultiComboboxComponent;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MultiComboboxModule,
                MultiComboboxWithPresetFormControlTestComponent
            ]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(waitForAsync(() => {
        hostFixture = TestBed.createComponent(MultiComboboxWithPresetFormControlTestComponent);
        host = hostFixture.componentInstance;
        combobox = hostFixture.debugElement.query(By.directive(MultiComboboxComponent)).componentInstance;
        combobox.dataSourceDirective.dataSource = host.formDataSource;
        hostFixture.detectChanges();
        return hostFixture.whenStable();
    }));

    it('deselects a removed token in the live open menu without changing other selections', async () => {
        const addOnButton = hostFixture.nativeElement.querySelector<HTMLButtonElement>(
            'button[fdinputgroupaddonbutton]'
        );
        expect(addOnButton).toBeTruthy();
        addOnButton?.click();
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();
        expect(combobox.isOpen).toBe(true);

        const bananaOption = Array.from(overlayContainerEl.querySelectorAll<HTMLLIElement>('li[role="option"]')).find(
            (option) => option.textContent?.includes('Banana')
        );
        const bananaCheckbox = bananaOption?.querySelector<HTMLInputElement>('input[type="checkbox"]');
        expect(bananaCheckbox).toBeTruthy();
        bananaCheckbox?.click();
        await hostFixture.whenStable();

        const bananaToken = Array.from(hostFixture.nativeElement.querySelectorAll<HTMLElement>('fd-token')).find(
            (token) => token.textContent?.includes('Banana')
        );
        expect(bananaToken).toBeTruthy();

        const formValues: { name: string; type: string }[][] = [];
        const selectionChanges: unknown[] = [];
        host.control.valueChanges.subscribe((value) => formValues.push(value ?? []));
        combobox.selectionChange.subscribe((event) => selectionChanges.push(event));

        const bananaTokenClose = bananaToken?.querySelector<HTMLElement>('.fd-token__close');
        expect(bananaTokenClose).toBeTruthy();
        bananaTokenClose?.click();
        await hostFixture.whenStable();

        expect(combobox.isOpen).toBe(true);
        expect(overlayContainerEl.querySelector('ul[role="listbox"]')).toBeTruthy();
        expect(bananaOption?.classList.contains('is-selected')).toBe(false);
        expect(bananaCheckbox?.checked).toBe(false);
        expect(combobox._selectedSuggestions().map((item) => item.label)).toEqual(['Apple']);
        expect(host.control.value?.map((item) => item.name)).toEqual(['Apple']);
        expect(formValues.map((value) => value.map((item) => item.name))).toEqual([['Apple']]);
        expect(selectionChanges).toHaveLength(1);
    });
});

describe('MultiComboBox — FormControl initial value renders on datasource populate (#13553)', () => {
    let hostFixture: ComponentFixture<MultiComboboxWithPresetFormControlTestComponent>;
    let combobox: MultiComboboxComponent;

    function getTokenLabels(): string[] {
        return Array.from(hostFixture.nativeElement.querySelectorAll('fd-token')).map((el) =>
            (el as HTMLElement).textContent!.trim()
        );
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MultiComboboxModule,
                MultiComboboxWithPresetFormControlTestComponent
            ]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        hostFixture = TestBed.createComponent(MultiComboboxWithPresetFormControlTestComponent);
        const host = hostFixture.componentInstance;
        combobox = hostFixture.debugElement.query(By.directive(MultiComboboxComponent)).componentInstance;
        combobox.dataSourceDirective.dataSource = host.formDataSource;
        hostFixture.detectChanges();
        return hostFixture.whenStable();
    }));

    it('FormControl initialized with a value renders tokens on load without opening the dropdown', async () => {
        hostFixture.detectChanges();
        await hostFixture.whenStable();
        hostFixture.detectChanges();

        const labels = getTokenLabels();
        expect(labels).toContain('Apple');
        expect(labels.length).toBe(1);
        expect(combobox.isOpen).toBe(false);
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
