import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDensityMode, ContentDensityObserver } from '@fundamental-ngx/core/content-density';
import { whenStable } from '@fundamental-ngx/core/tests';
import { CollectionFilter, FILTER_STRATEGY } from '@fundamental-ngx/platform/table-helpers';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter.component';
import { FilterCustomComponent } from './filter-custom.component';

/**
 * Test host that provides a custom filter template simulating a real use case:
 * a user form that directly mutates the model object (the `$implicit` context).
 */
@Component({
    template: `
        <ng-template #customFilterTpl let-model>
            <label>Price range</label>
            <input class="min-input" [value]="model.min ?? ''" (input)="model.min = +$event.target.value" />
            <input class="max-input" [value]="model.max ?? ''" (input)="model.max = +$event.target.value" />
        </ng-template>
    `
})
class FilterCustomTestHostComponent {
    @ViewChild('customFilterTpl', { static: true })
    customFilterTpl: TemplateRef<any>;
}

describe('FilterCustomComponent', () => {
    let fixture: ComponentFixture<FilterCustomComponent>;
    let component: FilterCustomComponent;
    let hostFixture: ComponentFixture<FilterCustomTestHostComponent>;
    let host: FilterCustomTestHostComponent;

    /** Helper to build a mock TableViewSettingsFilterComponent with the host's template */
    function buildMockFilter(tpl: TemplateRef<any>): TableViewSettingsFilterComponent {
        return {
            customFilterTemplate: tpl,
            column: 'price',
            label: 'Price',
            type: 'custom'
        } as any;
    }

    /** Helper to build a CollectionFilter with custom object value */
    function buildCollectionFilter(value: Record<string, any>): CollectionFilter {
        return {
            field: 'price',
            value,
            strategy: FILTER_STRATEGY.EQ,
            exclude: false
        } as CollectionFilter;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterCustomComponent, FilterCustomTestHostComponent],
            providers: [
                {
                    provide: ContentDensityObserver,
                    useValue: { value: ContentDensityMode.COZY } as Partial<ContentDensityObserver>
                }
            ]
        }).compileComponents();

        hostFixture = TestBed.createComponent(FilterCustomTestHostComponent);
        host = hostFixture.componentInstance;
        hostFixture.detectChanges();

        fixture = TestBed.createComponent(FilterCustomComponent);
        component = fixture.componentInstance;
    });

    describe('initialization and filterBy input', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should initialize _value to empty object when filterBy is undefined', () => {
            component.filterBy = undefined;
            expect(component._value).toEqual({});
        });

        it('should initialize _value to empty object when filterBy has a non-object value (string)', () => {
            const filter = {
                field: 'name',
                value: 'some string',
                strategy: FILTER_STRATEGY.EQ,
                exclude: false
            } as CollectionFilter;
            component.filterBy = filter;
            expect(component._value).toEqual({});
        });

        it('should initialize _value to empty object when filterBy has a null value', () => {
            const filter = {
                field: 'price',
                value: null,
                strategy: FILTER_STRATEGY.EQ,
                exclude: false
            } as any;
            component.filterBy = filter;
            expect(component._value).toEqual({});
        });

        it('should initialize _value to empty object when filterBy has an array value', () => {
            const filter = {
                field: 'tags',
                value: ['a', 'b'],
                strategy: FILTER_STRATEGY.EQ,
                exclude: false
            } as any;
            component.filterBy = filter;
            expect(component._value).toEqual({});
        });

        it('should clone the object value from filterBy', () => {
            const originalValue = { min: 10, max: 100 };
            component.filterBy = buildCollectionFilter(originalValue);
            expect(component._value).toEqual({ min: 10, max: 100 });
            // Must be a clone, not the same reference
            expect(component._value).not.toBe(originalValue);
        });

        it('should reset _valueLastEmitted to match _value on filterBy set', () => {
            component.filterBy = buildCollectionFilter({ min: 5, max: 50 });
            expect(component._valueLastEmitted).toEqual({ min: 5, max: 50 });
        });
    });

    describe('mutation detection', () => {
        beforeEach(() => {
            component.filterBy = buildCollectionFilter({ min: 0, max: 100 });
        });

        it('should not emit valueChange when _value has not changed', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._checkValueChanges();

            expect(spy).not.toHaveBeenCalled();
        });

        it('should emit valueChange when a property on _value is mutated', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            // Simulate what a custom template does: directly mutate the object
            component._value.min = 25;
            component._checkValueChanges();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ min: 25, max: 100 });
        });

        it('should emit valueChange when a new property is added to _value', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._value.currency = 'EUR';
            component._checkValueChanges();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ min: 0, max: 100, currency: 'EUR' });
        });

        it('should emit valueChange when a property is deleted from _value', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            delete component._value.max;
            component._checkValueChanges();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ min: 0 });
        });

        it('should not emit again on subsequent check if no further mutations', () => {
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            component._value.min = 25;
            component._checkValueChanges();
            expect(spy).toHaveBeenCalledTimes(1);

            // No further mutation
            component._checkValueChanges();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should emit for each distinct mutation across multiple check cycles', () => {
            const emitted: any[] = [];
            component.valueChange.subscribe((v) => emitted.push({ ...v }));

            component._value.min = 10;
            component._checkValueChanges();

            component._value.max = 200;
            component._checkValueChanges();

            component._value.min = 50;
            component._value.max = 300;
            component._checkValueChanges();

            expect(emitted).toEqual([
                { min: 10, max: 100 },
                { min: 10, max: 200 },
                { min: 50, max: 300 }
            ]);
        });

        it('should update _valueLastEmitted after emitting', () => {
            component._value.min = 42;
            component._checkValueChanges();

            expect(component._valueLastEmitted).toEqual({ min: 42, max: 100 });
            // Must be a clone, not the same reference
            expect(component._valueLastEmitted).not.toBe(component._value);
        });
    });

    describe('circular reference handling', () => {
        it('should silently catch JSON.stringify errors and not emit', () => {
            component.filterBy = buildCollectionFilter({ name: 'test' });
            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            // Create a circular reference that will cause JSON.stringify to throw
            const circular: any = { ref: null };
            circular.ref = circular;
            component._value = circular;

            // Should not throw
            expect(() => component._checkValueChanges()).not.toThrow();
            // Should not emit since try/catch swallows the error
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('filterBy reset behavior', () => {
        it('should stop emitting old mutations after filterBy is reassigned', () => {
            component.filterBy = buildCollectionFilter({ min: 0, max: 100 });

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            // Mutate and detect
            component._value.min = 50;
            component._checkValueChanges();
            expect(spy).toHaveBeenCalledTimes(1);

            // Re-assign filterBy with a new value (simulates user resetting the filter)
            component.filterBy = buildCollectionFilter({ min: 0, max: 500 });

            // No mutation on the new value yet
            component._checkValueChanges();
            expect(spy).toHaveBeenCalledTimes(1);

            // Mutate the new value
            component._value.min = 100;
            component._checkValueChanges();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenLastCalledWith({ min: 100, max: 500 });
        });
    });

    describe('template rendering with custom filter', () => {
        it('should render the custom filter template and pass the value as context', async () => {
            component.filter = buildMockFilter(host.customFilterTpl);
            component.filterBy = buildCollectionFilter({ min: 10, max: 200 });
            fixture.detectChanges();
            await whenStable(fixture);

            const minInput = fixture.nativeElement.querySelector('.min-input') as HTMLInputElement;
            const maxInput = fixture.nativeElement.querySelector('.max-input') as HTMLInputElement;

            expect(minInput).toBeTruthy();
            expect(maxInput).toBeTruthy();
            expect(minInput.value).toBe('10');
            expect(maxInput.value).toBe('200');
        });

        it('should detect value changes when user types in the custom template', async () => {
            component.filter = buildMockFilter(host.customFilterTpl);
            component.filterBy = buildCollectionFilter({ min: 0, max: 100 });
            fixture.detectChanges();
            await whenStable(fixture);

            const spy = jest.fn();
            component.valueChange.subscribe(spy);

            // Simulate user changing the min input
            const minInput = fixture.nativeElement.querySelector('.min-input') as HTMLInputElement;
            minInput.value = '25';
            minInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component._checkValueChanges();

            // afterEveryRender detects the mutation after each render cycle
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({ min: 25, max: 100 }));
        });

        it('should detect multiple sequential user inputs', async () => {
            component.filter = buildMockFilter(host.customFilterTpl);
            component.filterBy = buildCollectionFilter({ min: 0, max: 100 });
            fixture.detectChanges();
            await whenStable(fixture);

            const emitted: any[] = [];
            component.valueChange.subscribe((v) => emitted.push({ ...(v as object) }));

            const minInput = fixture.nativeElement.querySelector('.min-input') as HTMLInputElement;
            const maxInput = fixture.nativeElement.querySelector('.max-input') as HTMLInputElement;

            // User changes min
            minInput.value = '10';
            minInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component._checkValueChanges();

            // User changes max
            maxInput.value = '500';
            maxInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component._checkValueChanges();

            expect(emitted.length).toBe(2);
            expect(emitted[0]).toEqual(expect.objectContaining({ min: 10, max: 100 }));
            expect(emitted[1]).toEqual(expect.objectContaining({ min: 10, max: 500 }));
        });
    });

    describe('contentDensity', () => {
        it('should expose the content density from ContentDensityObserver', () => {
            expect(component.contentDensity).toBe(ContentDensityMode.COZY);
        });
    });
});
