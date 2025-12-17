import { computed, effect } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';

describe('CalendarLegendFocusingService', () => {
    let service: CalendarLegendFocusingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CalendarLegendFocusingService]
        });
        service = TestBed.inject(CalendarLegendFocusingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with null value', () => {
        expect(service.focusedSpecialDayNumber()).toBeNull();
    });

    describe('_handleLegendItemFocus', () => {
        it('should update focused special day number', () => {
            service._handleLegendItemFocus(5);

            expect(service.focusedSpecialDayNumber()).toBe(5);
        });

        it('should update focused special day number to null', () => {
            service._handleLegendItemFocus(5);
            service._handleLegendItemFocus(null);

            expect(service.focusedSpecialDayNumber()).toBeNull();
        });

        it('should overwrite previous focused item', () => {
            service._handleLegendItemFocus(5);
            service._handleLegendItemFocus(10);

            expect(service.focusedSpecialDayNumber()).toBe(10);
        });
    });

    describe('clearFocusedElement', () => {
        it('should clear focused special day number to null', () => {
            service._handleLegendItemFocus(5);
            service.clearFocusedElement();

            expect(service.focusedSpecialDayNumber()).toBeNull();
        });

        it('should work when called with already null value', () => {
            service.clearFocusedElement();

            expect(service.focusedSpecialDayNumber()).toBeNull();
        });
    });

    describe('signal reactivity', () => {
        it('should trigger effects when focus changes', () => {
            let updateCount = 0;
            let lastValue: Nullable<number> = null;

            // Create an effect that tracks signal changes
            TestBed.runInInjectionContext(() => {
                effect(() => {
                    lastValue = service.focusedSpecialDayNumber();
                    updateCount++;
                });
            });

            // Flush initial effect run
            TestBed.flushEffects();
            expect(updateCount).toBe(1);
            expect(lastValue).toBeNull();

            // Change the focused item
            service._handleLegendItemFocus(5);
            TestBed.flushEffects();

            // Effect should run again
            expect(updateCount).toBe(2);
            expect(lastValue).toBe(5);

            // Change again
            service._handleLegendItemFocus(10);
            TestBed.flushEffects();

            // Effect should run again
            expect(updateCount).toBe(3);
            expect(lastValue).toBe(10);
        });

        it('should update computed signals derived from focusedSpecialDayNumber', () => {
            TestBed.runInInjectionContext(() => {
                const derivedSignal = computed(() => {
                    const dayNum = service.focusedSpecialDayNumber();
                    return dayNum !== null ? `day-${dayNum}` : 'none';
                });

                // Initial value
                expect(derivedSignal()).toBe('none');

                // Update the service signal
                service._handleLegendItemFocus(7);

                // Computed should update
                expect(derivedSignal()).toBe('day-7');

                // Clear focus
                service.clearFocusedElement();

                // Computed should reflect the change
                expect(derivedSignal()).toBe('none');
            });
        });
    });
});
