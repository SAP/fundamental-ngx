import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { ObjectStatusComponent } from './object-status.component';

@Component({
    selector: 'fd-test-object-status',
    template: ` <span fd-object-status>Test Object Status</span> `,
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
            declarations: [ObjectStatusComponent, TestObjectStatusComponent],
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
        component.status = 'positive';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-status--positive')).toBe(true);
    });

    it('Should Add Glyph', () => {
        component.glyph = 'status-negative';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('sap-icon--status-negative')).toBe(true);
    });

    it('Should Add Indication Color', () => {
        component.indicationColor = 2;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-status--indication-2')).toBe(true);
    });

    it('Should Add Clickable Class', () => {
        component.clickable = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-status--link')).toBe(true);
    });

    it('Should Add Inverted Class', () => {
        component.inverted = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-status--inverted')).toBe(true);
    });

    it('Should Apply Large Design', () => {
        component.large = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-status--large')).toBe(true);
    });
});
