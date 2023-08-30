import { Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenericTagComponent } from './generic-tag.component';

@Component({
    selector: 'fd-test-generic-tag',
    template: ` <div fd-generic-tag [type]="type" [name]="name" [value]="value"></div> `
})
class TestGenericTagComponent {
    @ViewChild(GenericTagComponent, { static: true, read: ElementRef })
    genericTagElementRef: ElementRef;

    type: 'error' | 'success' | 'warning' | 'information';
    name: string;
    value: string;
}

describe('GenericTagComponent', () => {
    let genericTagElementRef: ElementRef;
    let testComponent: TestGenericTagComponent;
    let fixture: ComponentFixture<TestGenericTagComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GenericTagComponent, TestGenericTagComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestGenericTagComponent);
        genericTagElementRef = fixture.componentInstance.genericTagElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(genericTagElementRef).toBeTruthy();
    });

    it('Should add type', () => {
        testComponent.type = 'error';
        fixture.detectChanges();
        expect(genericTagElementRef.nativeElement.classList.contains('fd-generic-tag--error')).toBe(true);
    });

    it('Should display name', () => {
        const name = 'Product Cost';
        testComponent.name = name;
        fixture.detectChanges();

        const nameTextElement = fixture.nativeElement.querySelector('.fd-generic-tag__name');

        expect(nameTextElement).toBeTruthy();
        expect(nameTextElement.textContent.trim()).toBe(name);
    });

    it('Should display value', () => {
        const value = 'EUR';
        testComponent.value = value;
        fixture.detectChanges();

        const valueTextElement = fixture.nativeElement.querySelector('.fd-generic-tag__value');

        expect(valueTextElement).toBeTruthy();
        expect(valueTextElement.textContent.trim()).toBe(value);
    });
});
