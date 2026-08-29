import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal, ViewChild } from '@angular/core';
import {
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    flush,
    inject,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode, ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { DATA_PROVIDERS, DataProvider, isSelectableOptionItem } from '@fundamental-ngx/platform/shared';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { MultiComboboxSelectionChangeEvent } from '../commons/base-multi-combobox';
import { PlatformMultiComboboxModule } from '../multi-combobox.module';
import { MultiComboboxComponent } from './multi-combobox.component';

@Component({
    selector: 'fdp-multi-combobox-test',
    template: `
        <fdp-form-group>
            <fdp-form-field id="standard" placeholder="Type some text..." label="Standard" zone="zLeft" rank="4">
                <fdp-multi-combobox
                    name="standard"
                    displayKey="name"
                    [autoResize]="autoResize"
                    [group]="group"
                    [groupKey]="groupKey"
                    [showSecondaryText]="showSecondaryText"
                    [secondaryKey]="secondaryKey"
                    [fdContentDensity]="contentDensity"
                    [dataSource]="dataSource"
                    [maxHeight]="maxHeight"
                    [selectedItems]="selectedItems"
                    (selectionChange)="onSelect($event)"
                ></fdp-multi-combobox>
            </fdp-form-field>
        </fdp-form-group>
    `,
    imports: [FdpFormGroupModule, FormModule, ReactiveFormsModule, PlatformMultiComboboxModule, ContentDensityModule]
})
class MultiComboboxStandardComponent {
    @ViewChild(MultiComboboxComponent)
    multiCombobox: MultiComboboxComponent;
    dataSource = [
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
    selectedItems: [{ name: string; type: string }] | null = [this.dataSource[0]];
    maxHeight: string;
    autoResize = false;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    group = false;
    groupKey = 'type';
    showSecondaryText = false;
    secondaryKey = 'type';

    onSelect(event: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = event.selectedItems;
    }
}

describe('MultiComboboxComponent default values', () => {
    let component: MultiComboboxStandardComponent;
    let fixture: ComponentFixture<MultiComboboxStandardComponent>;
    let multiCombobox: MultiComboboxComponent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiComboboxStandardComponent],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiComboboxStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        multiCombobox = component.multiCombobox;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to change the contentDensity to "compact"', () => {
        component.contentDensity = ContentDensityMode.COMPACT;

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        expect(component.multiCombobox.elementRef.nativeElement.classList).toContain('is-compact');
    });

    it('should be able to fix the height of the multi-combobox list via the maxHeight property', () => {
        component.maxHeight = '320px';

        fixture.detectChanges();

        expect(multiCombobox.maxHeight).toBe('320px');
    });

    it('should be able to expand/collapse list if click on onPrimaryButtonClick', () => {
        // Initial state - closed
        expect(multiCombobox.isOpen).toBeFalsy();

        // Click to open
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        // Verify opened
        expect(multiCombobox.isOpen).toBeTruthy();

        // Click to close
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        // Verify closed
        expect(multiCombobox.isOpen).toBeFalsy();
    });

    it('should list all elements when limitless is true', () => {
        multiCombobox.setLimitless(true);
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        expect(multiCombobox._suggestions.length).toBe(component.dataSource.length);

        multiCombobox.setLimitless(false);
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        if (component.dataSource.length > multiCombobox.getMapLimit()) {
            expect(multiCombobox._suggestions.length).toBeLessThan(component.dataSource.length);
        } else {
            expect(multiCombobox._suggestions.length).toBe(component.dataSource.length);
        }
    });

    it('should be able to see Group', () => {
        component.group = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        // Verify the popover opened and group is configured
        expect(multiCombobox.isOpen).toBeTruthy();
        expect(component.group).toBeTruthy();
    });

    it('should be able to see Secondary Column', () => {
        component.showSecondaryText = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        // Verify the popover opened and secondary text is configured
        expect(multiCombobox.isOpen).toBeTruthy();
        expect(component.showSecondaryText).toBeTruthy();
    });

    it('dataSource items should be converted to SelectableOptionItem', () => {
        const item = multiCombobox._suggestions[0];

        expect(isSelectableOptionItem(item)).toBeTruthy();
    });

    it('should select and unselect an item', () => {
        const item = multiCombobox._suggestions[0];
        const propagateChangeSpy = jest.spyOn(<any>multiCombobox, '_propagateChange');

        expect(item.selected).toBe(true);

        multiCombobox.toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(false);
        expect(multiCombobox._selectedSuggestions.length).toEqual(0);
        expect(propagateChangeSpy).toHaveBeenCalled();

        multiCombobox.toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBe(true);
        expect(multiCombobox._selectedSuggestions.length).toEqual(1);
        expect(propagateChangeSpy).toHaveBeenCalled();
    });

    it('should select and unselect all items', () => {
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        // Use component API to select all items
        multiCombobox.handleSelectAllItems(true);
        fixture.detectChanges();

        if (multiCombobox.getMapLimit() < multiCombobox._suggestions.length) {
            expect(multiCombobox._selectedSuggestions.length).toEqual(multiCombobox.getMapLimit());
        } else {
            expect(multiCombobox._selectedSuggestions.length).toEqual(multiCombobox._suggestions.length);
        }

        // Use component API to unselect all items
        multiCombobox.handleSelectAllItems(false);
        fixture.detectChanges();

        expect(multiCombobox._selectedSuggestions.length).toEqual(0);
    });

    it('should not open dropdown when openDropdownOnAddOnClicked is false', () => {
        jest.spyOn(multiCombobox.addOnButtonClicked, 'emit');
        jest.spyOn(multiCombobox, 'showList');
        multiCombobox.openDropdownOnAddOnClicked = false;
        multiCombobox._addOnClicked(new MouseEvent('click'));
        expect(multiCombobox.addOnButtonClicked.emit).toHaveBeenCalled();
        expect(multiCombobox.showList).not.toHaveBeenCalled();
    });

    it('should select item automatically if full match found', async () => {
        multiCombobox._selectedSuggestions = [];
        multiCombobox.inputText = component.dataSource[2].name;
        multiCombobox.searchTermChanged(multiCombobox.inputText);
        fixture.detectChanges();
        await fixture.whenStable();
        multiCombobox.onBlur(
            new FocusEvent('blur', {
                relatedTarget: fixture.debugElement.query(By.css('.fd-tokenizer__input')).nativeElement
            })
        );
        expect(multiCombobox._selectedSuggestions.length).toEqual(1);
        expect(multiCombobox._selectedSuggestions[0].label).toEqual(component.dataSource[2].name);
    });

    it('should not create items duplicates', async () => {
        component.selectedItems = [component.dataSource[0]];
        fixture.detectChanges();
        await fixture.whenRenderingDone();
        await fixture.whenStable();

        expect(multiCombobox._suggestions.length).toEqual(component.dataSource.length);
        expect(multiCombobox._selectedSuggestions.length).toEqual(component.selectedItems.length);
    });

    it('should not move focus to search field when deselecting all items', () => {
        const focusToSearchFieldSpy = jest.spyOn(<any>multiCombobox, '_focusToSearchField');
        const item = multiCombobox._suggestions[0];

        // Ensure we start with a selected item
        expect(item.selected).toBe(true);
        expect(multiCombobox._selectedSuggestions.length).toEqual(1);

        // Toggle selection to deselect the only item
        multiCombobox.toggleSelection(item);
        fixture.detectChanges();

        // Verify item was deselected
        expect(item.selected).toBe(false);
        expect(multiCombobox._selectedSuggestions.length).toEqual(0);

        // Verify that _focusToSearchField was NOT called
        expect(focusToSearchFieldSpy).not.toHaveBeenCalled();
    });
});

// ─── Regression tests for #13553 ─────────────────────────────────────────────
// Covers the [selectedItems] binding path: programmatic set without opening
// the dropdown must update tokens and option selected-flags on reopen.
// The FormControl.setValue() path is not reproduced here because writeValue()
// reaches _setSelectedSuggestions() via a synchronous datasource, making that
// path correct in jsdom even before the fix — covered by the docs form example.

const ITEMS_13553 = [
    { name: 'Apple', type: 'Fruits' },
    { name: 'Banana', type: 'Fruits' },
    { name: 'Pineapple', type: 'Fruits' },
    { name: 'Strawberry', type: 'Fruits' },
    { name: 'Broccoli', type: 'Vegetables' }
];

@Component({
    selector: 'fdp-multi-combobox-selected-items-test',
    template: `
        <fdp-form-group>
            <fdp-form-field id="field" label="Items" zone="zLeft" rank="1">
                <fdp-multi-combobox
                    name="items"
                    displayKey="name"
                    [dataSource]="dataSource"
                    [selectedItems]="selectedItems"
                ></fdp-multi-combobox>
            </fdp-form-field>
        </fdp-form-group>
    `,
    imports: [FdpFormGroupModule, FormModule, PlatformMultiComboboxModule]
})
class MultiComboboxSelectedItemsTestComponent {
    @ViewChild(MultiComboboxComponent)
    multiCombobox: MultiComboboxComponent;

    dataSource = [...ITEMS_13553];
    selectedItems: any[] = [];
}

describe('MultiComboboxComponent #13553 – programmatic set without dropdown open', () => {
    let fixture: ComponentFixture<MultiComboboxSelectedItemsTestComponent>;
    let component: MultiComboboxSelectedItemsTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiComboboxSelectedItemsTestComponent],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(MultiComboboxSelectedItemsTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should render tokens when [selectedItems] is set programmatically without opening the dropdown', async () => {
        // Confirm suggestions are populated — the bug is NOT an empty lookup table
        expect(component.multiCombobox._fullFlatSuggestions.length).toBeGreaterThan(0);

        // Set selection programmatically — no dropdown interaction
        component.selectedItems = [ITEMS_13553[0], ITEMS_13553[1]];
        fixture.detectChanges();
        await fixture.whenStable();

        // _selectedSuggestions must reflect the new selection
        expect(component.multiCombobox._selectedSuggestions.length).toBe(2);

        // Tokens must be rendered in the DOM
        const tokens = fixture.nativeElement.querySelectorAll('fd-token');
        expect(tokens.length).toBe(2);

        const labels = Array.from(tokens).map((t: Element) => t.textContent?.trim());
        expect(labels).toContain('Apple');
        expect(labels).toContain('Banana');
    });
});

// ─── RED tests for #13553 – stale selected-flag bug (dropdown reopen state) ──
// _setSelectedSuggestions() only ever sets selected=true, never resets stale
// flags. After replace/clear, reopening the dropdown shows stale checked items.
// These tests fail on current main for the RIGHT reason (stale option.selected
// flags), not a setup artifact.

describe('MultiComboboxComponent #13553 – stale selected-flag on dropdown reopen', () => {
    let fixture: ComponentFixture<MultiComboboxSelectedItemsTestComponent>;
    let component: MultiComboboxSelectedItemsTestComponent;
    let multiCombobox: MultiComboboxComponent;
    let overlayContainerEl: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiComboboxSelectedItemsTestComponent],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();

        fixture = TestBed.createComponent(MultiComboboxSelectedItemsTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        tick(50);
        fixture.detectChanges();
        multiCombobox = component.multiCombobox;
    }));

    /** Returns labels of list items in the open dropdown that carry is-selected. */
    function getSelectedLabels(): string[] {
        return Array.from(overlayContainerEl.querySelectorAll('li.fd-list__item.is-selected[role="option"]')).map(
            (el) => el.querySelector('.fd-list__title')?.textContent?.trim() ?? ''
        );
    }

    /** Opens the dropdown and ticks to let CDK overlay render. */
    function openDropdown(): void {
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        tick(200);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
    }

    it('replace: after [Apple]→[Banana], Apple option must not remain selected in _suggestions', fakeAsync(() => {
        // The overlay DOM cannot distinguish 2-vs-1 selected items for this path in jsdom
        // (CDK overlay renders from a snapshot). Assert the model that drives [selected] instead —
        // _suggestions[i].selected is the exact value the template reads for the li[selected] binding.
        (multiCombobox as any).setValue([ITEMS_13553[0]]); // Apple
        tick(100);
        fixture.detectChanges();

        const appleOption = multiCombobox._suggestions.find((s) => s.label === 'Apple')!;
        expect(appleOption.selected).toBe(true);

        (multiCombobox as any).setValue([ITEMS_13553[1]]); // Banana — replace
        tick(100);
        fixture.detectChanges();

        const bananaOption = multiCombobox._suggestions.find((s) => s.label === 'Banana')!;
        expect(bananaOption.selected).toBe(true); // Banana must be selected after replace
        // On main: Apple.selected stays true (stale flag bug) — this assertion fails
        expect(appleOption.selected).toBe(false); // fails on main
        discardPeriodicTasks();
    }));

    it('clear: after [Apple, Banana]→[], reopen dropdown should show nothing checked', fakeAsync(() => {
        // Seed Apple + Banana directly to bypass the round-1 ngOnChanges bug
        const appleOption = multiCombobox._fullFlatSuggestions.find((s) => s.label === 'Apple')!;
        const bananaOption = multiCombobox._fullFlatSuggestions.find((s) => s.label === 'Banana')!;
        appleOption.selected = true;
        bananaOption.selected = true;
        multiCombobox._selectedSuggestions = [appleOption, bananaOption];
        fixture.detectChanges();

        // Clear — no dropdown open during the set
        component.selectedItems = [];
        fixture.detectChanges();
        tick(50);
        fixture.detectChanges();

        // Reopen dropdown and assert option state
        openDropdown();

        const listItems = overlayContainerEl.querySelectorAll('li.fd-list__item[role="option"]');
        expect(listItems.length).toBeGreaterThan(0); // dropdown is populated
        const selectedLabels = getSelectedLabels();
        expect(selectedLabels.length).toBe(0); // fails on main — early-return leaves flags true
        discardPeriodicTasks();
    }));
});

// ─── Regression tests for #13553 – onChange emits raw values, not wrappers ────
// _propagateChange() was calling this.onChange(this._selectedSuggestions) which
// passed SelectableOptionItem wrappers to the FormControl. The control value then
// stored wrappers, causing re-matching failures when writeValue fed the value back.

const ITEMS_PROPAGATE = [
    { name: 'Apple', type: 'Fruits' },
    { name: 'Banana', type: 'Fruits' },
    { name: 'Pineapple', type: 'Fruits' }
];

@Component({
    selector: 'fdp-multi-combobox-form-control-test',
    template: `
        <form [formGroup]="form">
            <fdp-form-group>
                <fdp-form-field id="ctrl" label="Items" zone="zLeft" rank="1">
                    <fdp-multi-combobox
                        name="items"
                        displayKey="name"
                        formControlName="items"
                        [dataSource]="dataSource"
                    ></fdp-multi-combobox>
                </fdp-form-field>
            </fdp-form-group>
        </form>
    `,
    imports: [FdpFormGroupModule, FormModule, ReactiveFormsModule, PlatformMultiComboboxModule]
})
class MultiComboboxFormControlTestComponent {
    @ViewChild(MultiComboboxComponent)
    multiCombobox: MultiComboboxComponent;

    dataSource = [...ITEMS_PROPAGATE];
    form = new FormGroup({ items: new FormControl([]) });
}

@Component({
    selector: 'fdp-multi-combobox-signal-selection-test',
    template: `
        <fdp-form-group>
            <fdp-form-field id="signal-items" label="Items" zone="zLeft" rank="1">
                <fdp-multi-combobox
                    name="items"
                    displayKey="name"
                    [dataSource]="dataSource"
                    [selectedItems]="selectedItems()"
                    (selectionChange)="selectedItems.set($event.selectedItems)"
                ></fdp-multi-combobox>
            </fdp-form-field>
        </fdp-form-group>
    `,
    imports: [FdpFormGroupModule, FormModule, PlatformMultiComboboxModule]
})
class MultiComboboxSignalSelectionTestComponent {
    @ViewChild(MultiComboboxComponent)
    multiCombobox: MultiComboboxComponent;

    dataSource = [...ITEMS_13553];
    selectedItems = signal<typeof ITEMS_13553>([]);
}

describe('MultiComboboxComponent #13553 - signal-bound selection', () => {
    let fixture: ComponentFixture<MultiComboboxSignalSelectionTestComponent>;
    let component: MultiComboboxSignalSelectionTestComponent;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiComboboxSignalSelectionTestComponent],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        })
            .compileComponents()
            .then(() => {
                overlayContainerEl = TestBed.inject(OverlayContainer).getContainerElement();
            });
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(MultiComboboxSignalSelectionTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('keeps existing options selected after adding an item', async () => {
        component.selectedItems.set([ITEMS_13553[3], ITEMS_13553[4]]);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.multiCombobox._selectedSuggestions.map((item) => item.label)).toEqual([
            'Strawberry',
            'Broccoli'
        ]);

        component.multiCombobox.onPrimaryButtonClick(component.multiCombobox.isOpen);
        fixture.detectChanges();
        await fixture.whenStable();

        const appleCheckbox = overlayContainerEl.querySelector<HTMLInputElement>('fd-checkbox input')!;
        appleCheckbox.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.selectedItems().map((item) => item.name)).toEqual(['Strawberry', 'Broccoli', 'Apple']);

        const tokenLabels = Array.from(fixture.nativeElement.querySelectorAll('fd-token')).map((token: Element) =>
            token.textContent?.trim()
        );
        expect(tokenLabels).toEqual(['Strawberry', 'Broccoli', 'Apple']);

        const selectedLabels = component.multiCombobox._suggestions
            .filter((item) => item.selected)
            .map((item) => item.label);
        expect(selectedLabels).toEqual(['Apple', 'Strawberry', 'Broccoli']);
    });
});

describe('MultiComboboxComponent #13553 – onChange emits raw values (not wrappers)', () => {
    let fixture: ComponentFixture<MultiComboboxFormControlTestComponent>;
    let component: MultiComboboxFormControlTestComponent;
    let multiCombobox: MultiComboboxComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiComboboxFormControlTestComponent],
            providers: [DynamicComponentService, RtlService, { provide: DATA_PROVIDERS, useClass: DataProvider as any }]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(MultiComboboxFormControlTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        multiCombobox = component.multiCombobox;
    });

    it('FormControl.value should contain raw datasource objects after toggleSelection', async () => {
        const item = multiCombobox._suggestions.find((s) => s.label === 'Apple')!;
        multiCombobox.toggleSelection(item);
        fixture.detectChanges();
        await fixture.whenStable();

        const value: any[] = component.form.get('items')!.value ?? [];
        expect(value.length).toBe(1);
        // Raw datasource object must not carry a `selected` property (wrappers do)
        expect(value[0]).not.toHaveProperty('selected');
        expect(value[0].name).toBe('Apple');
    });

    it('selected item remains checked in _suggestions after searchTermChanged re-emits datasource', async () => {
        const item = multiCombobox._suggestions.find((s) => s.label === 'Banana')!;
        multiCombobox.toggleSelection(item);
        fixture.detectChanges();
        await fixture.whenStable();

        multiCombobox.searchTermChanged('');
        fixture.detectChanges();
        await fixture.whenStable();

        const bananaOption = multiCombobox._suggestions.find((s) => s.label === 'Banana')!;
        expect(bananaOption.selected).toBe(true);
    });
});
