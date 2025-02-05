import { A } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

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
    standalone: true,
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
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        let toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(multiCombobox._suggestions.length);

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(0);
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

        const group = overlayContainerEl.querySelectorAll('.fd-list__group-header');
        expect(group.length).toBe(2);
    });

    it('should be able to see Secondary Column', () => {
        component.showSecondaryText = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        const secondaryColumns = overlayContainerEl.querySelectorAll('.fd-list__secondary');
        expect(secondaryColumns.length).toBe(multiCombobox._suggestions.length);
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
        const selectEvent = new KeyboardEvent('keydown', {
            keyCode: A,
            ctrlKey: true
        });
        const unselectEvent = new KeyboardEvent('keydown', {
            keyCode: A,
            ctrlKey: true,
            shiftKey: true
        });

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();
        overlayContainerEl.querySelector('.fd-list__item')?.dispatchEvent(selectEvent);

        fixture.detectChanges();

        if (multiCombobox.getMapLimit() < multiCombobox._suggestions.length) {
            expect(multiCombobox._selectedSuggestions.length).toEqual(multiCombobox.getMapLimit());
        } else {
            expect(multiCombobox._selectedSuggestions.length).toEqual(multiCombobox._suggestions.length);
        }

        overlayContainerEl.querySelector('.fd-list__item')?.dispatchEvent(unselectEvent);
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
});
