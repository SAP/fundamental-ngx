import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RatingIndicatorComponent, RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { first } from 'rxjs/operators';

const prefix = 'fd-rating-indicator';

describe('RatingIndicatorComponent', () => {
    let elementRef: ElementRef;
    let component: RatingIndicatorComponent;
    let fixture: ComponentFixture<RatingIndicatorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RatingIndicatorModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingIndicatorComponent);
        elementRef = fixture.componentInstance.elementRef();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have available to select halves`, () => {
        component.allowHalves = true;
        component.buildComponentCssClass();
        expect(elementRef.nativeElement.classList.contains(`${prefix}--half-star`)).toBeTrue();
    });

    it(`should have compact icon`, () => {
        component.size = 'compact';
        component.buildComponentCssClass();
        expect(elementRef.nativeElement.classList.contains(`${prefix}--${component.size}`)).toBeTrue();
    });

    it(`should use custom rating icons`, () => {
        component.ratedIcon = 'test-icon-favorite';
        component.unratedIcon = 'test-icon-unfavorite';
        component.buildComponentCssClass();
        expect(elementRef.nativeElement.classList.contains(`${prefix}--icon`)).toBeTrue();
    });

    it(`should have correct viewValue`, () => {
        const ratingChangedSpy = spyOn(component.ratingChanged, 'emit');
        component.onSelect(2);
        expect(ratingChangedSpy).toHaveBeenCalledWith(2);
    });

    it(`should have correct indicator capacity`, () => {
        component.indicatorCapacity = 4;
        component.allowHalves = false;
        component.ngOnInit();
        fixture.detectChanges();
        expect(component._rates.length).toEqual(4);
    });

    it(`should have correct indicator capacity with halves`, () => {
        component.indicatorCapacity = 4;
        component.allowHalves = true;
        component.ngOnInit();
        fixture.detectChanges();
        expect(component._rates.length).toEqual(4 * 2);
    });

    it(`should have an indicator capacity with value = 5`, () => {
        component.indicatorCapacity = 0;
        component.allowHalves = false;
        component.ngOnInit();
        fixture.detectChanges();
        expect(component._rates.length).toEqual(5);
    });

    it(`should have value after click on rate icon`, (done) => {
        component.allowHalves = false;

        component.ratingChanged.pipe(first()).subscribe((value: number) => {
            expect(component.value).toBe(2);
            expect(value).toBe(2);
            done();
        });

        elementRef.nativeElement.querySelectorAll('.fd-rating-indicator__label')[2].click();
    });

    it(`should have ratings data with correct rating object`, () => {
        component.ratings = {
            1: 10,
            4: 20,
            5: 30
        };
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.ratingAverage).toBe(4);
        expect(component.totalRatings).toBe(60);
        expect(component.viewValue).toBe(4);
    });
});
