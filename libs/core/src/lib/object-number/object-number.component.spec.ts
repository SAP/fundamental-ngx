import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { ObjectNumberComponent } from './object-number.component';

@Component({
    selector: 'fd-test-object-number',
    template: `
        <fd-object-number [number]="1000.37" [unit]="unit" [decimal]="decimal" [large]="large" [status]="status" [class]="class"></fd-object-number>`
})
class TestObjectNumberComponent {
    @ViewChild(ObjectNumberComponent, { static: true })
    objectNumberComponent: ObjectNumberComponent;
    unit = 'EUR';
    decimal = 0;
    large = false;
    status = '';
    class = '';
}

describe('ObjectNumberComponent', () => {
    let component: ObjectNumberComponent;
    let fixture: ComponentFixture<TestObjectNumberComponent>;
    const numberTextEl = '.fd-object-number__text';

    beforeEach(waitForAsync(() => {
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
        fixture.componentInstance.large = true;
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-number--large')).toBe(true);
    });

    it('should add status', () => {
        fixture.componentInstance.status = 'positive';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-object-number--positive')).toBe(true);
    });

    it('should add custom class', () => {
        fixture.componentInstance.class = 'custom-class';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('custom-class')).toBe(true);
    });

    it('should display units', () => {
        fixture.componentInstance.unit = 'TEST';
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.textContent.includes('TEST')).toBe(true);
    });

    it('should display decimals', () => {
        fixture.componentInstance.decimal = 2;
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.querySelector(numberTextEl).textContent.includes('1,000.37')).toBeTruthy();
    });

    it('should not display decimals if [decimal] set to 0', () => {
        fixture.componentInstance.decimal = 0;
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.querySelector(numberTextEl).textContent.trim()).toEqual('1,000');
    });
});
