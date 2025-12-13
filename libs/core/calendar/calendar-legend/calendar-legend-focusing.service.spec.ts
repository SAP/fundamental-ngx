import { computed, effect } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';

describe('CalendarLegendFocusingService', () => {
    let service: CalendarLegendFocusingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalendarLegendFocusingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with null values', () => {
        const focusedItem = service.focusedLegendItem();
        expect(focusedItem.legendId).toBeNull();
        expect(focusedItem.specialDayNumber).toBeNull();
    });

    describe('_handleLegendItemFocus', () => {
        it('should update focused legend item with provided values', () => {
            service._handleLegendItemFocus('legend-1', 5);

            const focusedItem = service.focusedLegendItem();
            expect(focusedItem.legendId).toBe('legend-1');
            expect(focusedItem.specialDayNumber).toBe(5);
        });

        it('should update focused legend item with null specialDayNumber', () => {
            service._handleLegendItemFocus('legend-2', null);

            const focusedItem = service.focusedLegendItem();
            expect(focusedItem.legendId).toBe('legend-2');
            expect(focusedItem.specialDayNumber).toBeNull();
        });

        it('should overwrite previous focused item', () => {
            service._handleLegendItemFocus('legend-1', 5);
            service._handleLegendItemFocus('legend-2', 10);

            const focusedItem = service.focusedLegendItem();
            expect(focusedItem.legendId).toBe('legend-2');
            expect(focusedItem.specialDayNumber).toBe(10);
        });
    });

    describe('clearFocusedElement', () => {
        it('should clear focused legend item to null values', () => {
            service._handleLegendItemFocus('legend-1', 5);
            service.clearFocusedElement();

            const focusedItem = service.focusedLegendItem();
            expect(focusedItem.legendId).toBeNull();
            expect(focusedItem.specialDayNumber).toBeNull();
        });

        it('should work when called with already null values', () => {
            service.clearFocusedElement();

            const focusedItem = service.focusedLegendItem();
            expect(focusedItem.legendId).toBeNull();
            expect(focusedItem.specialDayNumber).toBeNull();
        });
    });

    describe('signal reactivity', () => {
        it('should trigger effects when focus changes', () => {
            let updateCount = 0;
            let lastValue: { legendId: Nullable<string>; specialDayNumber: Nullable<number> } = {
                legendId: null,
                specialDayNumber: null
            };

            // Create an effect that tracks signal changes
            TestBed.runInInjectionContext(() => {
                effect(() => {
                    lastValue = service.focusedLegendItem();
                    updateCount++;
                });
            });

            // Flush initial effect run
            TestBed.flushEffects();
            expect(updateCount).toBe(1);
            expect(lastValue.legendId).toBeNull();

            // Change the focused item
            service._handleLegendItemFocus('legend-1', 5);
            TestBed.flushEffects();

            // Effect should run again
            expect(updateCount).toBe(2);
            expect(lastValue.legendId).toBe('legend-1');
            expect(lastValue.specialDayNumber).toBe(5);

            // Change again
            service._handleLegendItemFocus('legend-2', 10);
            TestBed.flushEffects();

            // Effect should run again
            expect(updateCount).toBe(3);
            expect(lastValue.legendId).toBe('legend-2');
            expect(lastValue.specialDayNumber).toBe(10);
        });

        it('should update computed signals derived from focusedLegendItem', () => {
            TestBed.runInInjectionContext(() => {
                const derivedSignal = computed(() => {
                    const item = service.focusedLegendItem();
                    return item.legendId || 'none';
                });

                // Initial value
                expect(derivedSignal()).toBe('none');

                // Update the service signal
                service._handleLegendItemFocus('test-legend', 7);

                // Computed should update
                expect(derivedSignal()).toBe('test-legend');

                // Clear focus
                service.clearFocusedElement();

                // Computed should reflect the change
                expect(derivedSignal()).toBe('none');
            });
        });
    });
});
