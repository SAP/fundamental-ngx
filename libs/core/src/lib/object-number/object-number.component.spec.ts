import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectNumberComponent } from './object-number.component';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-object-number',
    template: `
        <fd-object-number [number]="1000.37" [unit]="unit" [decimal]="decimal"></fd-object-number>`
})
class TestObjectNumberComponent {
    @ViewChild(ObjectNumberComponent, { static: true })
    objectNumberComponent: ObjectNumberComponent;
    unit = 'EUR';
    decimal = 0;
}

describe('ObjectNumberComponent', () => {
    let component: ObjectNumberComponent;
    let fixture: ComponentFixture<TestObjectNumberComponent>;
    const numberTextEl = '.fd-object-number__text';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectNumberComponent, TestObjectNumberComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectNumberComponent);
        component = fixture.componentInstance.objectNumberComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply large design', () => {
        component.large = true;
        component.onChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-number--large')).toBe(true);
    });

    it('should add status', () => {
        component.status = 'positive';
        component.onChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-number--positive')).toBe(true);
    });

    it('should add custom class', () => {
        component.class = 'custom-class';
        component.onChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('custom-class')).toBe(true);
    });

    it('should display units', () => {
        fixture.componentInstance.unit = 'TEST';
        component.onChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.textContent.includes('TEST')).toBe(true);
    });

    it('should display decimals', () => {
        fixture.componentInstance.decimal = 2;
        component.onChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.querySelector(numberTextEl).textContent.includes('1,000.37')).toBeTruthy();
    });

    it('should not display decimals if [decimal] set to 0', () => {
        fixture.componentInstance.decimal = 0;
        component.onChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.querySelector(numberTextEl).textContent.trim()).toEqual('1,000');
    });
});
