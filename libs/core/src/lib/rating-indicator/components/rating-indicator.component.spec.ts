import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { PopoverComponent } from '../../popover/popover.component';
import { RatingIndicatorComponent } from './rating-indicator.component';

const prefix = 'fd-rating-indicator';

fdescribe('RatingIndicatorComponent', () => {
  let elementRef: ElementRef;
  let component: RatingIndicatorComponent;
  let fixture: ComponentFixture<RatingIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingIndicatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingIndicatorComponent);
    elementRef = fixture.componentInstance.elementRef();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should add class - ${prefix}--half-star`, () => {
    component.allowHalves = true;
    component.buildComponentCssClass();
    expect(elementRef.nativeElement.classList.contains(`${prefix}--half-star`)).toBeTrue();
  });

  it(`should add class - ${prefix}--compact`, () => {
    component.size = 'compact';
    component.buildComponentCssClass();
    expect(elementRef.nativeElement.classList.contains(`${prefix}--${component.size}`)).toBeTrue();
  });

  it(`should add class - ${prefix}--icon`, () => {
    component.ratedIcon = 'test-icon-favorite';
    component.unratedIcon = 'test-icon-unfavorite';
    component.buildComponentCssClass();
    expect(elementRef.nativeElement.classList.contains(`${prefix}--icon`)).toBeTrue();
  });

  it(`should have correct viewValue`, () => {
    const ratingChangedSpy = spyOn(component.ratingChanged, 'emit');
    component.onSelect(2);
    expect(ratingChangedSpy).toHaveBeenCalledWith({ value: 2 });
  });

  it(`should have correct indicator count from total indicator`, () => {
    component.indicatorTotal = 4;
    component.allowHalves = false;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.icons.length).toEqual(4);
  });

  it(`should have correct indicator count from total indicator with halves`, () => {
    component.indicatorTotal = 4;
    component.allowHalves = true;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.icons.length).toEqual(4 * 2);
  });

  it(`we should have an indicator count with a total indicator=111 (wrong count)`, () => {
    component.indicatorTotal = 111;
    component.allowHalves = false;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.icons.length).toEqual(7);
  });

});
