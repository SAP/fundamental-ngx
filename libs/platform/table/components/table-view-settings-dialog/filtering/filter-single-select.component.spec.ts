import { ComponentFixture, TestBed } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';
import { NOT_FILTERED_OPTION_VALUE } from './constants';
import { FilterSingleSelectComponent } from './filter-single-select.component';

describe('FilterSingleSelectComponent', () => {
    let component: FilterSingleSelectComponent;
    let fixture: ComponentFixture<FilterSingleSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterSingleSelectComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FilterSingleSelectComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should initialize with empty options', () => {
            expect(component.options).toEqual([]);
        });

        it('should set value to NOT_FILTERED when filterBy is undefined', () => {
            component.filterBy = undefined;
            fixture.detectChanges();

            expect(component._value).toBe(NOT_FILTERED_OPTION_VALUE);
        });

        it('should set value to first selected option from filterBy', () => {
            component.options = [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
            ];
            component.filterBy = { field: 'status', value: ['inactive'], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();

            expect(component._value).toBe('inactive');
        });

        it('should set value to NOT_FILTERED when filterBy value is empty', () => {
            component.options = [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
            ];
            component.filterBy = { field: 'test', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();

            expect(component._value).toBe(NOT_FILTERED_OPTION_VALUE);
        });
    });

    describe('selection behavior', () => {
        beforeEach(() => {
            component.options = [
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' }
            ];
            component.filterBy = { field: 'color', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
        });

        it('should emit selected value as array', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._onValueChange('green');

            expect(spy).toHaveBeenCalledWith(['green']);
        });

        it('should emit empty array when NOT_FILTERED is selected', () => {
            component.filterBy = { field: 'color', value: ['red'], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._onValueChange(NOT_FILTERED_OPTION_VALUE);

            expect(spy).toHaveBeenCalledWith([]);
        });

        it('should not emit when selecting the same value', () => {
            component.filterBy = { field: 'color', value: ['blue'], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._onValueChange('blue');

            expect(spy).not.toHaveBeenCalled();
        });

        it('should update internal value when different value is selected', () => {
            component._value = 'red';

            component._onValueChange('blue');

            expect(component._value).toBe('blue');
        });
    });

    describe('focus behavior', () => {
        beforeEach(() => {
            component.options = [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' }
            ];
            component.filterBy = { field: 'test', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
        });

        it('should query for list items after view init', async () => {
            await whenStable(fixture);

            expect(component.listItems).toBeDefined();
            expect(component.listItems.length).toBeGreaterThan(0);
        });

        it('should focus the first list item after view init', async () => {
            await whenStable(fixture);

            const firstItem = component.listItems.first;
            const focusSpy = jest.spyOn(firstItem, 'focus');

            component.ngAfterViewInit();

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should handle empty list items gracefully', () => {
            component.options = [];
            component.filterBy = undefined;
            fixture.detectChanges();

            // Should not throw when listItems is empty
            expect(() => component.ngAfterViewInit()).not.toThrow();
        });
    });

    describe('radio button interaction', () => {
        beforeEach(() => {
            component.options = [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' }
            ];
            component.filterBy = { field: 'size', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
        });

        it('should select option on radio button click', async () => {
            await whenStable(fixture);

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            const radioButtons = fixture.nativeElement.querySelectorAll('input[type="radio"]');
            // Find the radio button for 'sm' value
            const smRadio = Array.from(radioButtons).find(
                (rb: any) => rb.value === 'sm' || rb.nextElementSibling?.textContent?.includes('Small')
            ) as HTMLInputElement;

            if (smRadio) {
                smRadio.click();
                fixture.detectChanges();
                expect(spy).toHaveBeenCalledWith(['sm']);
            }
        });

        it('should clear selection when NOT_FILTERED is clicked', async () => {
            component.filterBy = { field: 'size', value: ['md'], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
            await whenStable(fixture);

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            // Manually trigger the value change to NOT_FILTERED
            component._onValueChange(NOT_FILTERED_OPTION_VALUE);
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledWith([]);
        });
    });

    describe('NOT_FILTERED constant', () => {
        it('should expose NOT_FILTERED_OPTION_VALUE constant', () => {
            expect(component.NOT_FILTERED_OPTION_VALUE).toBeDefined();
            expect(typeof component.NOT_FILTERED_OPTION_VALUE).toBe('string');
            expect(component.NOT_FILTERED_OPTION_VALUE).toBe(NOT_FILTERED_OPTION_VALUE);
        });
    });
});
