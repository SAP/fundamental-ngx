import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { ObjectStatusComponent } from './object-status.component';

@Component({
  selector: 'fd-test-object-status',
  template: `
        <span fd-object-status>Test Object Status</span>
    `
})
class TestObjectStatusComponent {
  @ViewChild(ObjectStatusComponent, { static: true })
  objectStatusComponent: ObjectStatusComponent;
}

describe('ObjectStatusComponent', () => {
  let component: ObjectStatusComponent;
  let fixture: ComponentFixture<TestObjectStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectStatusComponent, TestObjectStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestObjectStatusComponent);
    component = fixture.componentInstance.objectStatusComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Add Status', () => {
    component.ngOnInit();
    component.status = 'positive';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.elementRef().nativeElement.classList.contains('fd-object-status--positive')).toBe(true);
  });

  it('Should Add Glyph', () => {
    component.ngOnInit();
    component.glyph = 'status-negative';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.elementRef().nativeElement.classList.contains('sap-icon--status-negative')).toBe(true);
  });

  it('Should Add Indication Color', () => {
    component.ngOnInit();
    component.indicationColor = 2;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.elementRef().nativeElement.classList.contains('fd-object-status--indication-2')).toBe(true);
  });

  it('Should Add Clickable Class', () => {
    component.ngOnInit();
    component.clickable = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.elementRef().nativeElement.classList.contains('fd-object-status--link')).toBe(true);
  });

  it('Should Add Inverted Class', () => {
    component.ngOnInit();
    component.inverted = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.elementRef().nativeElement.classList.contains('fd-object-status--inverted')).toBe(true);
  });

  it('Should Apply Large Design', () => {
    component.ngOnInit();
    component.large = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.elementRef().nativeElement.classList.contains('fd-object-status--large')).toBe(true);
  });
});
