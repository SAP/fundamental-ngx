import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { CollectionFilter, FilterableColumnDataType } from '@fundamental-ngx/platform/table-helpers';
import { FilterableColumn } from '../../table-p13-dialog/filtering/filtering.model';
import {
    IncludeExcludeFiltersComponent,
    IncludeExcludeFiltersData,
    IncludeExcludeFiltersResultData
} from './include-exclude-filters.component';

describe('IncludeExcludeFiltersComponent', () => {
    let component: IncludeExcludeFiltersComponent;
    let fixture: ComponentFixture<IncludeExcludeFiltersComponent>;
    const langSignal = signal(FD_LANGUAGE_ENGLISH);

    const mockColumns: FilterableColumn[] = [
        {
            label: 'Name',
            key: 'name',
            dataType: FilterableColumnDataType.STRING,
            filterable: true
        },
        {
            label: 'Price',
            key: 'price',
            dataType: FilterableColumnDataType.NUMBER,
            filterable: true
        },
        {
            label: 'Status',
            key: 'status',
            dataType: FilterableColumnDataType.STRING,
            filterable: false
        }
    ];

    const mockFilterData: IncludeExcludeFiltersData = {
        columns: mockColumns,
        collectionFilter: [],
        validator: (rules: CollectionFilter[]) => true
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IncludeExcludeFiltersComponent],
            providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: langSignal }]
        }).compileComponents();

        fixture = TestBed.createComponent(IncludeExcludeFiltersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should initialize with filterData input', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component.columns).toHaveLength(2); // Only filterable columns
            expect(component.columns[0].key).toBe('name');
            expect(component.columns[1].key).toBe('price');
        });

        it('should initialize include rules with at least one empty rule', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component._includeRules).toHaveLength(1);
            expect(component._includeRules[0].hasValue).toBe(false);
        });

        it('should initialize exclude rules with at least one empty rule', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component._excludeRules).toHaveLength(1);
            expect(component._excludeRules[0].hasValue).toBe(false);
        });

        it('should initialize with existing filters', () => {
            const existingFilters: CollectionFilter[] = [
                { field: 'name', value: 'test', strategy: 'contains', exclude: false },
                { field: 'price', value: 100, strategy: 'greaterThan', exclude: true }
            ];

            fixture.componentRef.setInput('filterData', {
                ...mockFilterData,
                collectionFilter: existingFilters
            });
            fixture.detectChanges();

            expect(component._includeRules).toHaveLength(1);
            expect(component._includeRules[0].columnKey).toBe('name');
            expect(component._excludeRules).toHaveLength(1);
            expect(component._excludeRules[0].columnKey).toBe('price');
        });

        it('should expand exclude panel when exclude rules exist', () => {
            const existingFilters: CollectionFilter[] = [
                { field: 'price', value: 100, strategy: 'greaterThan', exclude: true }
            ];

            fixture.componentRef.setInput('filterData', {
                ...mockFilterData,
                collectionFilter: existingFilters
            });
            fixture.detectChanges();

            expect(component._excludePanelExpanded).toBe(true);
        });

        it('should not expand exclude panel when no exclude rules exist', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component._excludePanelExpanded).toBe(false);
        });
    });

    describe('adding rules', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();
        });

        it('should add a new include rule', () => {
            const initialLength = component._includeRules.length;
            component._addNewRule(component._includeRules);

            expect(component._includeRules).toHaveLength(initialLength + 1);
        });

        it('should add a new exclude rule', () => {
            const initialLength = component._excludeRules.length;
            component._addNewRule(component._excludeRules);

            expect(component._excludeRules).toHaveLength(initialLength + 1);
        });

        it('should copy column and strategy from the last rule', () => {
            // Set up the first rule
            component._includeRules[0].columnKey = 'name';
            component._includeRules[0].strategy = 'contains';

            component._addNewRule(component._includeRules);

            expect(component._includeRules[1].columnKey).toBe('name');
            expect(component._includeRules[1].strategy).toBe('contains');
        });
    });

    describe('removing rules', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();
        });

        it('should remove a rule from include rules', () => {
            component._addNewRule(component._includeRules);
            const ruleToRemove = component._includeRules[0];
            const initialLength = component._includeRules.length;

            component._removeRule(ruleToRemove, component._includeRules);

            expect(component._includeRules).toHaveLength(initialLength - 1);
        });

        it('should remove a rule from exclude rules', () => {
            component._addNewRule(component._excludeRules);
            const ruleToRemove = component._excludeRules[0];
            const initialLength = component._excludeRules.length;

            component._removeRule(ruleToRemove, component._excludeRules);

            expect(component._excludeRules).toHaveLength(initialLength - 1);
        });

        it('should keep at least one empty rule when removing the last rule', () => {
            const onlyRule = component._includeRules[0];

            component._removeRule(onlyRule, component._includeRules);

            expect(component._includeRules).toHaveLength(1);
            expect(component._includeRules[0]).not.toBe(onlyRule);
        });

        it('should not remove a rule that does not exist in the array', () => {
            const fakeRule = component._includeRules[0];
            component._addNewRule(component._excludeRules);
            const initialLength = component._excludeRules.length;

            component._removeRule(fakeRule, component._excludeRules);

            expect(component._excludeRules).toHaveLength(initialLength);
        });
    });

    describe('signal reactivity', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();
        });

        it('should update _validIncludeRulesCount when include rules become valid', () => {
            expect(component._validIncludeRulesCount()).toBe(0);

            // Make the rule valid
            component._includeRules[0].columnKey = 'name';
            component._includeRules[0].strategy = 'contains';
            component._includeRules[0].value = 'test';
            component._includeRules[0].setValid(true);

            component._onRuleStateChange();

            expect(component._validIncludeRulesCount()).toBe(1);
        });

        it('should update _validExcludeRulesCount when exclude rules become valid', () => {
            expect(component._validExcludeRulesCount()).toBe(0);

            // Make the rule valid
            component._excludeRules[0].columnKey = 'price';
            component._excludeRules[0].strategy = 'greaterThan';
            component._excludeRules[0].value = 100;
            component._excludeRules[0].setValid(true);

            component._onRuleStateChange();

            expect(component._validExcludeRulesCount()).toBe(1);
        });

        it('should track multiple valid rules', () => {
            // Add and validate multiple include rules
            component._addNewRule(component._includeRules);
            component._addNewRule(component._includeRules);

            component._includeRules[0].columnKey = 'name';
            component._includeRules[0].strategy = 'contains';
            component._includeRules[0].value = 'test';
            component._includeRules[0].setValid(true);

            component._includeRules[1].columnKey = 'price';
            component._includeRules[1].strategy = 'greaterThan';
            component._includeRules[1].value = 50;
            component._includeRules[1].setValid(true);

            component._onRuleStateChange();

            expect(component._validIncludeRulesCount()).toBe(2);
        });
    });

    describe('reset functionality', () => {
        beforeEach(() => {
            const existingFilters: CollectionFilter[] = [
                { field: 'name', value: 'test', strategy: 'contains', exclude: false },
                { field: 'price', value: 100, strategy: 'greaterThan', exclude: true }
            ];

            fixture.componentRef.setInput('filterData', {
                ...mockFilterData,
                collectionFilter: existingFilters
            });
            fixture.detectChanges();
        });

        it('should reset to initial state', () => {
            // Modify the rules
            component._addNewRule(component._includeRules);
            component._addNewRule(component._excludeRules);

            component.reset();

            // Should reset to initial filters (1 include, 1 exclude)
            expect(component._includeRules).toHaveLength(1);
            expect(component._excludeRules).toHaveLength(1);
            expect(component._validIncludeRulesCount()).toBe(0);
            expect(component._validExcludeRulesCount()).toBe(0);
        });

        it('should emit filterChange on reset', () => {
            const filterChangeSpy = jest.fn();
            component.filterChange.subscribe(filterChangeSpy);

            component.reset();

            expect(filterChangeSpy).toHaveBeenCalled();
        });

        it('should emit resetAvailabilityChange on reset', () => {
            const resetAvailabilitySpy = jest.fn();
            component.resetAvailabilityChange.subscribe(resetAvailabilitySpy);

            component.reset();

            expect(resetAvailabilitySpy).toHaveBeenCalled();
        });
    });

    describe('filter change emission', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();
        });

        it('should emit filterChange when a rule changes', () => {
            const filterChangeSpy = jest.fn();
            component.filterChange.subscribe(filterChangeSpy);

            component._onRuleChange();

            expect(filterChangeSpy).toHaveBeenCalled();
        });

        it('should emit correct filter structure with include and exclude flags', () => {
            let emittedData: IncludeExcludeFiltersResultData | undefined;
            component.filterChange.subscribe((data) => {
                emittedData = data;
            });

            // Set up valid include rule
            component._includeRules[0].columnKey = 'name';
            component._includeRules[0].strategy = 'contains';
            component._includeRules[0].value = 'test';
            component._includeRules[0].setValid(true);

            // Set up valid exclude rule
            component._excludeRules[0].columnKey = 'price';
            component._excludeRules[0].strategy = 'greaterThan';
            component._excludeRules[0].value = 100;
            component._excludeRules[0].setValid(true);

            component._onRuleChange();

            expect(emittedData).toBeDefined();
            expect(emittedData!.filterBy).toHaveLength(2);

            const includeFilter = emittedData!.filterBy.find((f) => f.field === 'name');
            const excludeFilter = emittedData!.filterBy.find((f) => f.field === 'price');

            expect(includeFilter?.exclude).toBe(false);
            expect(excludeFilter?.exclude).toBe(true);
        });

        it('should only emit valid rules', () => {
            let emittedData: IncludeExcludeFiltersResultData | undefined;
            component.filterChange.subscribe((data) => {
                emittedData = data;
            });

            // Add multiple rules but only make one valid
            component._addNewRule(component._includeRules);
            component._includeRules[0].columnKey = 'name';
            component._includeRules[0].strategy = 'contains';
            component._includeRules[0].value = 'test';
            component._includeRules[0].setValid(true);

            // Second rule is incomplete (invalid)
            component._includeRules[1].setValid(false);

            component._onRuleChange();

            expect(emittedData!.filterBy).toHaveLength(1);
            expect(emittedData!.filterBy[0].field).toBe('name');
        });
    });

    describe('reset availability', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();
        });

        it('should emit resetAvailabilityChange as false when only empty rules exist', () => {
            let isResetAvailable: boolean | undefined;
            component.resetAvailabilityChange.subscribe((available) => {
                isResetAvailable = available;
            });

            component._recalculateResetAvailability();

            expect(isResetAvailable).toBe(false);
        });

        it('should emit resetAvailabilityChange as true when include rules have values', () => {
            let isResetAvailable: boolean | undefined;
            component.resetAvailabilityChange.subscribe((available) => {
                isResetAvailable = available;
            });

            component._includeRules[0].columnKey = 'name';
            component._includeRules[0].value = 'test';

            component._recalculateResetAvailability();

            expect(isResetAvailable).toBe(true);
        });

        it('should emit resetAvailabilityChange as true when exclude rules have values', () => {
            let isResetAvailable: boolean | undefined;
            component.resetAvailabilityChange.subscribe((available) => {
                isResetAvailable = available;
            });

            component._excludeRules[0].columnKey = 'price';
            component._excludeRules[0].value = 100;

            component._recalculateResetAvailability();

            expect(isResetAvailable).toBe(true);
        });

        it('should emit resetAvailabilityChange as true when multiple rules exist', () => {
            let isResetAvailable: boolean | undefined;
            component.resetAvailabilityChange.subscribe((available) => {
                isResetAvailable = available;
            });

            component._addNewRule(component._includeRules);

            component._recalculateResetAvailability();

            expect(isResetAvailable).toBe(true);
        });
    });

    describe('validator integration', () => {
        it('should accept validator input', () => {
            const validatorFn = jest.fn(() => true);

            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.componentRef.setInput('validator', validatorFn);
            fixture.detectChanges();

            expect(component.validator()).toBe(validatorFn);
        });

        it('should handle undefined validator', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component.validator()).toBeUndefined();
        });
    });

    describe('panel expansion state', () => {
        it('should keep include panel expanded by default', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component._includePanelExpanded).toBe(true);
        });

        it('should collapse exclude panel by default when no exclude rules exist', () => {
            fixture.componentRef.setInput('filterData', mockFilterData);
            fixture.detectChanges();

            expect(component._excludePanelExpanded).toBe(false);
        });
    });
});
