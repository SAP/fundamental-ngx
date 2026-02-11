import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RatingIndicatorComponent } from './rating-indicator.component';

const prefix = 'fd-rating-indicator';

describe('RatingIndicatorComponent', () => {
    let elementRef: ElementRef;
    let component: RatingIndicatorComponent;
    let fixture: ComponentFixture<RatingIndicatorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RatingIndicatorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingIndicatorComponent);
        elementRef = fixture.componentInstance.elementRef;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have available to select halves`, () => {
        fixture.componentRef.setInput('allowHalves', true);
        fixture.detectChanges();
        expect(elementRef.nativeElement.classList.contains(`${prefix}--half-star`)).toBe(true);
    });

    it(`should have compact icon`, () => {
        fixture.componentRef.setInput('size', 'compact');
        fixture.detectChanges();
        expect(elementRef.nativeElement.classList.contains(`${prefix}--compact`)).toBe(true);
    });

    it(`should use custom rating icons`, () => {
        fixture.componentRef.setInput('ratedIcon', 'test-icon-favorite');
        fixture.componentRef.setInput('unratedIcon', 'test-icon-unfavorite');
        fixture.detectChanges();
        expect(elementRef.nativeElement.classList.contains(`${prefix}--icon`)).toBe(true);
    });

    it(`should emit ratingChanged on select`, () => {
        const emitSpy = jest.spyOn(component.ratingChanged, 'emit');
        component['onSelect'](2);
        expect(emitSpy).toHaveBeenCalledWith(2);
    });

    it(`should have correct indicator capacity`, () => {
        fixture.componentRef.setInput('indicatorCapacity', 4);
        fixture.componentRef.setInput('allowHalves', false);
        fixture.detectChanges();
        expect(component['rates']().length).toEqual(4);
    });

    it(`should have correct indicator capacity with halves`, () => {
        fixture.componentRef.setInput('indicatorCapacity', 4);
        fixture.componentRef.setInput('allowHalves', true);
        fixture.detectChanges();
        expect(component['rates']().length).toEqual(4 * 2);
    });

    it(`should have an indicator capacity with default value = 5 when set to 0`, () => {
        fixture.componentRef.setInput('indicatorCapacity', 0);
        fixture.componentRef.setInput('allowHalves', false);
        fixture.detectChanges();
        expect(component['rates']().length).toEqual(5);
    });

    it(`should have value after click on rate icon`, (done) => {
        fixture.componentRef.setInput('allowHalves', false);
        fixture.detectChanges();

        component.ratingChanged.subscribe((value: number) => {
            expect(component['internalValue']()).toBe(2);
            expect(value).toBe(2);
            done();
        });

        elementRef.nativeElement.querySelectorAll('.fd-rating-indicator__label')[2].click();
    });

    it(`should have ratings data with correct rating object`, () => {
        fixture.componentRef.setInput('ratings', {
            1: 10,
            4: 20,
            5: 30
        });
        fixture.detectChanges();

        // Verify computed values are calculated correctly from ratings
        expect(component.computedRatingAverage).toBe(4);
        expect(component.computedTotalRatings).toBe(60);

        // With signals, displayValue comes from internalValue which can be set via:
        // 1. CVA writeValue (for forms/ngModel)
        // 2. User interaction (onSelect)
        // 3. Explicit value/ratingAverage input
        // The ratings input only computes averages but doesn't auto-set display value
        // To show the computed average, use writeValue or set ratingAverage input
        const avgRating = component.computedRatingAverage;
        if (avgRating !== null && avgRating !== undefined) {
            component.writeValue(avgRating);
        }
        expect(component.displayValue()).toBe(4);
    });

    it(`should update disabled state via CVA`, () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(component['internalDisabled']()).toBe(true);
        expect(elementRef.nativeElement.classList.contains('is-disabled')).toBe(true);
    });

    it(`should write value via CVA`, () => {
        component.writeValue(3.7);
        fixture.detectChanges();
        expect(component['internalValue']()).toBe(4);
    });

    it(`should parse half values correctly when allowHalves is true`, () => {
        fixture.componentRef.setInput('allowHalves', true);
        fixture.detectChanges();

        // fractional 0.2 <= 0.25, rounds down to 2
        component.writeValue(2.2);
        expect(component['internalValue']()).toBe(2);

        // fractional 0.3 > 0.25 and <= 0.5, rounds to 2.5
        component.writeValue(2.3);
        expect(component['internalValue']()).toBe(2.5);

        // fractional 0.7 > 0.5, rounds up to 3
        component.writeValue(2.7);
        expect(component['internalValue']()).toBe(3);
    });

    it(`should compute CSS classes correctly`, () => {
        fixture.componentRef.setInput('size', 'lg');
        fixture.componentRef.setInput('allowHalves', true);
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();

        const classes = elementRef.nativeElement.className;
        expect(classes).toContain(prefix);
        expect(classes).toContain(`${prefix}--lg`);
        expect(classes).toContain(`${prefix}--half-star`);
        expect(classes).toContain('is-disabled');
    });

    it(`should generate rating items from ratings object`, () => {
        fixture.componentRef.setInput('ratings', {
            1: 5,
            2: 10,
            3: 15,
            4: 20,
            5: 50
        });
        fixture.detectChanges();

        expect(component['ratingItems']().length).toBe(5);
        expect(component.computedTotalRatings).toBe(100);
    });
});
