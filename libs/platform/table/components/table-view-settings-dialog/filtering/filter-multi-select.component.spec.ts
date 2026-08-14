import { ComponentFixture, TestBed } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';
import { FilterMultiSelectComponent } from './filter-multi-select.component';

describe('FilterMultiSelectComponent', () => {
    let component: FilterMultiSelectComponent;
    let fixture: ComponentFixture<FilterMultiSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterMultiSelectComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FilterMultiSelectComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should initialize with empty options', () => {
            expect(component.options).toEqual([]);
        });

        it('should initialize with empty selected values', () => {
            component.filterBy = undefined;
            fixture.detectChanges();
            expect(component._value).toEqual([]);
        });

        it('should build selectable options from input options and filterBy', () => {
            component.options = [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' }
            ];
            component.filterBy = {
                field: 'test',
                value: ['opt1'],
                strategy: 'EQ',
                exclude: false
            } as any;
            fixture.detectChanges();

            expect(component._selectableOptions).toEqual([
                { label: 'Option 1', value: 'opt1', selected: true },
                { label: 'Option 2', value: 'opt2', selected: false }
            ]);
        });
    });

    describe('selection behavior', () => {
        beforeEach(() => {
            component.options = [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Pending', value: 'pending' }
            ];
            component.filterBy = { field: 'status', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
        });

        it('should emit selected values when option is checked', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._onSelectChange(component._selectableOptions[0], true);

            expect(spy).toHaveBeenCalledWith(['active']);
        });

        it('should emit updated values when option is unchecked', () => {
            component.filterBy = {
                field: 'status',
                value: ['active', 'pending'],
                strategy: 'EQ',
                exclude: false
            } as any;
            fixture.detectChanges();

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._onSelectChange(component._selectableOptions[0], false);

            expect(spy).toHaveBeenCalledWith(['pending']);
        });

        it('should handle multiple selections', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._onSelectChange(component._selectableOptions[0], true);
            component._onSelectChange(component._selectableOptions[2], true);

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenLastCalledWith(['active', 'pending']);
        });

        it('should update selected state on the option', () => {
            const option = component._selectableOptions[1];
            expect(option.selected).toBe(false);

            component._onSelectChange(option, true);

            expect(option.selected).toBe(true);
        });
    });

    describe('focus behavior', () => {
        beforeEach(() => {
            component.options = [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' },
                { label: 'Option 3', value: 'opt3' }
            ];
            component.filterBy = { field: 'test', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
        });

        it('should query for list items after view init', async () => {
            await whenStable(fixture);

            expect(component.listItems).toBeDefined();
            expect(component.listItems.length).toBe(3);
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

    describe('keyboard interaction', () => {
        beforeEach(() => {
            component.options = [
                { label: 'Status 1', value: 's1' },
                { label: 'Status 2', value: 's2' }
            ];
            component.filterBy = { field: 'status', value: [], strategy: 'EQ', exclude: false } as any;
            fixture.detectChanges();
        });

        it('should toggle selection on checkbox click', async () => {
            await whenStable(fixture);

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
            checkbox.click();
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledWith(['s1']);
        });
    });
});
