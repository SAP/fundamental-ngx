import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { firstValueFrom } from 'rxjs';
import { MultiInputComponent } from './multi-input.component';
import { MultiInputModule } from './multi-input.module';

describe('MultiInputComponent', () => {
    let component: MultiInputComponent;
    let fixture: ComponentFixture<MultiInputComponent>;

    /**
     * ngOnChanges is not being called when input values are set to component instance directly.
     * `updateComponentInput` function adds this logic
     */
    function updateComponentInput(inputName: string, value: any): void {
        component[inputName] = value;
        component.ngOnChanges({
            [inputName]: new SimpleChange(null, value, false)
        });
        fixture.detectChanges();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiInputModule],
            providers: [DynamicComponentService, RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiInputComponent);
        component = fixture.componentInstance;
        updateComponentInput('dropdownValues', ['displayedValue', 'displayedValue2']);
        fixture.detectChanges();
    });

    it('should set placeholder', async () => {
        await fixture.whenStable();

        const placeholder = 'placeholder';
        component.placeholder = placeholder;
        (component as any)._changeDetRef.markForCheck();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input').placeholder).toBe(placeholder);
    });

    it('should handle search term change', async () => {
        await fixture.whenStable();
        spyOn(component.searchTermChange, 'emit');
        spyOn(component, 'filterFn');
        spyOn(component, 'openChangeHandle').and.callThrough();

        const text = 'test';
        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        // openChangeHandle will be triggered by keydown event
        inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));

        await fixture.whenStable();

        expect(component.searchTerm).toBe(text);
        expect(component.searchTermChange.emit).toHaveBeenCalled();
        expect(component.filterFn).toHaveBeenCalled();
        expect(component.openChangeHandle).toHaveBeenCalledWith(true);
    });

    it('should filter dropdown values', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);

        spyOn(component, 'filterFn').and.callThrough();

        const text = 'foo';
        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.filterFn).toHaveBeenCalled();
        expect(component.dropdownValues.length).toBe(3);
        const vm = await firstValueFrom(component._viewModel$);
        expect(vm.displayedOptions.length).toBe(1);
    });

    it('should open/close popover on input addon click', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);
        component.open = false;

        const inputButtonElement = fixture.nativeElement.querySelector('.fd-input-group__button');
        inputButtonElement.click();
        fixture.detectChanges();
        expect(component.open).toBe(true);

        inputButtonElement.click();
        fixture.detectChanges();

        expect(component.open).toBe(false);
    });

    it('should select values', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);
        fixture.detectChanges();
        component.open = true;
        fixture.detectChanges();

        component.selected = ['test1'];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fd-token')).toBeTruthy();
    });

    it('should de-select values', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);
        component.open = true;
        fixture.detectChanges();

        component.selected = ['test1'];
        fixture.detectChanges();

        expect(component.selected.length).toBe(1);
        expect(component.selected[0]).toBe('test1');

        component.selected = [];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fd-token')).toBeFalsy();
    });

    it('should bring back values, if canceled on mobile mode and dont emit changes', async () => {
        component.mobile = true;

        spyOn(component, 'onChange');
        spyOn(component.selectedChange, 'emit');

        await fixture.whenStable();

        component._handleSelect(true, component.dropdownValues[0]);

        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.selectedChange.emit).not.toHaveBeenCalled();

        expect(component.selected).toEqual([component.dropdownValues[0]]);

        component.dialogDismiss([]);

        expect(component.selected).toEqual([]);
    });

    it('should emit changes values on approve', async () => {
        component.mobile = true;

        spyOn(component, 'onChange');
        spyOn(component.selectedChange, 'emit');

        await fixture.whenStable();

        component._handleSelect(true, component.dropdownValues[0]);

        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.selectedChange.emit).not.toHaveBeenCalled();
        expect(component.selected).toEqual([component.dropdownValues[0]]);

        component.dialogApprove();

        expect(component.onChange).toHaveBeenCalled();
        expect(component.selectedChange.emit).toHaveBeenCalled();
        expect(component.selected).toEqual([component.dropdownValues[0]]);
    });

    it('should focus the input and clear the search term after selection', async () => {
        const inputFocusSpy = spyOn(component.searchInputElement.nativeElement, 'focus');

        await fixture.whenStable();

        component.searchTerm = 'search';

        component._handleSelect(true, component.dropdownValues[0]);

        expect(inputFocusSpy).toHaveBeenCalled();
        expect(component.searchTerm).toBe('');
    });

    it('should handle showAll button', async () => {
        await fixture.whenStable();
        const event = new MouseEvent('click');
        updateComponentInput('searchTerm', 'term');
        updateComponentInput('dropdownValues', ['term1', 'term2', 'value']);
        spyOn(event, 'preventDefault');
        spyOn(event, 'stopPropagation');
        component._showAllClicked(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(component.searchTerm).toBe('');

        const vm = await firstValueFrom(component._viewModel$);

        expect(vm.displayedOptions.length).toBe(component.dropdownValues.length);
    });

    it('should support object values', async () => {
        updateComponentInput('searchTerm', 'f');
        updateComponentInput(
            'dropdownValues',
            ['foo', 'baz', 'bar'].map((v) => ({ value: v, name: v.toUpperCase() }))
        );
        updateComponentInput('valueFn', (el) => el.value);
        updateComponentInput('displayFn', (el) => el.name);
        updateComponentInput('selected', ['foo']);

        const vm = await firstValueFrom(component._viewModel$);
        expect(vm.displayedOptions.length).toEqual(1);
        expect(component.selected).toEqual(['foo']);
    });

    it('should keep selected options when list of options is changed', async () => {
        updateComponentInput('dropdownValues', ['foo', 'baz', 'bar']);
        updateComponentInput('selected', ['foo1']);

        const vm1 = await firstValueFrom(component._viewModel$);
        expect(vm1.displayedOptions.length).toEqual(3);
        expect(vm1.selectedOptions.length).toEqual(1);
        expect(component.selected).toEqual(['foo1']);

        component._handleSelect(true, component.dropdownValues[1]);

        const vm2 = await firstValueFrom(component._viewModel$);
        expect(vm2.displayedOptions.length).toEqual(3);
        // displaying only those options that were "seen" as values
        expect(vm2.selectedOptions.map((o) => o.value)).toEqual(['foo1', 'baz']);
        // expecting options to be present as values even if they doesn't match any provided options
        expect(component.selected).toEqual(['foo1', 'baz']);

        updateComponentInput('dropdownValues', ['foo1']);

        const vm3 = await firstValueFrom(component._viewModel$);
        expect(vm3.displayedOptions.length).toEqual(1);
        expect(vm3.selectedOptions.map((o) => o.value)).toEqual(['foo1', 'baz']);
        // displaying only those options that were "seen" as values
        expect(component.selected).toEqual(['foo1', 'baz']);
    });
    it('should selectAll values  selectAllItems call with true and deselect all items it call with false', async () => {
        await fixture.whenStable();

        updateComponentInput('dropdownValues', ['test1', 'test2', 'test3']);
        component.selectAllItems(true);
        fixture.detectChanges();

        expect(component.selected).toEqual(['test1', 'test2', 'test3']);

        component.selectAllItems(false);
        fixture.detectChanges();

        expect(component.selected).toEqual([]);
    });

    it('should not open dropdown when openDropdownOnAddOnClicked is false', () => {
        spyOn(component.addOnButtonClicked, 'emit');
        spyOn(component, 'openChangeHandle');
        component.openDropdownOnAddOnClicked = false;
        component._addOnButtonClicked(new MouseEvent('click'));
        expect(component.addOnButtonClicked.emit).toHaveBeenCalled();
        expect(component.openChangeHandle).not.toHaveBeenCalled();
    });
});
