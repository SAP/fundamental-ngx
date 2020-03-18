import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLabelComponent } from './info-label.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'fd-test-object-status',
  template: `<span fd-object-status>Test Object Status</span>`
})
class TestInfoLabelComponent {
  @ViewChild(InfoLabelComponent, { static: true })
  objectStatusComponent: InfoLabelComponent;
}

describe('InfoLabelComponent', () => {
  let component: InfoLabelComponent;
  let fixture: ComponentFixture<TestInfoLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLabelComponent, TestInfoLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInfoLabelComponent);
    component = fixture.componentInstance.objectStatusComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should Add label Type', () => {
    component.ngOnInit();
    component.labelType = 'numeric';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(this.component.elementRef().nativeElement.classList.contains('fd-info-label--numeric')).toBe(true);
  });

  it('Should Add  label Type', () => {
    component.ngOnInit();
    component.labelType = 'only-icon';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(this.component.elementRef().nativeElement.classList.contains('fd-info-label--only-icon')).toBe(true);
  });

  it('Should Add  label Type', () => {
    component.ngOnInit();
    component.labelType = 'icon';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(this.component.elementRef().nativeElement.classList.contains('fd-info-label--icon')).toBe(true);
  });

  it('Should Add Accent Color', () => {
    component.ngOnInit();
    component.color = '2';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(this.component.elementRef().nativeElement.classList.contains('fd-info-label--accent-color-2')).toBe(true);
  });

  it('Should Add icon', () => {
    component.ngOnInit();
    component.glyph = 'future';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(this.component.elementRef().nativeElement.classList.contains('sap-icon--future')).toBe(true);
  });

  it('Should Add icon', () => {
    component.ngOnInit();
    component.glyph = 'activity-2';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(this.component.elementRef().nativeElement.classList.contains('sap-icon--add-activity-2')).toBe(true);
  });
});
