import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLabelComponent } from './info-label.component';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-info-label',
    template: `<span fd-info-label>info Label</span>`
})
class TestInfoLabelComponent {
    @ViewChild(InfoLabelComponent, { static: true })
    infoLabelComponent: InfoLabelComponent;
}

describe('InfoLabelComponent', () => {
    let component: InfoLabelComponent;
    let fixture: ComponentFixture<TestInfoLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoLabelComponent, TestInfoLabelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInfoLabelComponent);
        component = fixture.componentInstance.infoLabelComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add label Type', () => {
        component.ngOnInit();
        component.type = 'numeric';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--numeric')).toBe(true);
    });

    it('Should Add  label Type only icon', () => {
        component.ngOnInit();
        component.type = 'only-icon';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--only-icon')).toBe(true);
    });

    it('Should Add  label Type icon', () => {
        component.ngOnInit();
        component.type = 'icon';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--icon')).toBe(true);
    });

    it('Should Add Accent Color', () => {
        component.ngOnInit();
        component.color = '2';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-info-label--accent-color-2')).toBe(true);
    });

    it('Should Add icon', () => {
        component.ngOnInit();
        component.glyph = 'future';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('sap-icon--future')).toBe(true);
    });

    it('Should Add icon', () => {
        component.ngOnInit();
        component.glyph = 'add-activity-2';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('sap-icon--add-activity-2')).toBe(true);
    });
});
