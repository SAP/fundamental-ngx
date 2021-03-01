import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObjectStatusComponent } from './object-status.component';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-object-status',
    template: `
        <span
            fd-object-status
            [status]="status"
            [glyph]="glyph"
            [label]="label"
            [indicationColor]="indicationColor"
            [clickable]="clickable"
            [inverted]="inverted"
            [large]="large"
        >
        </span>
    `
})
class TestObjectStatusComponent {
    @ViewChild(ObjectStatusComponent, { static: true, read: ElementRef })
    objectStatusElementRef: ElementRef;

    status: 'negative' | 'critical' | 'positive' | 'informative';
    glyph: string;
    label: string;
    indicationColor: number;
    clickable: boolean;
    inverted: boolean;
    large: boolean;
}

describe('ObjectStatusComponent', () => {
    let objectStatusElementRef: ElementRef;
    let testComponent: TestObjectStatusComponent;
    let fixture: ComponentFixture<TestObjectStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectStatusComponent, TestObjectStatusComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestObjectStatusComponent);
        objectStatusElementRef = fixture.componentInstance.objectStatusElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(objectStatusElementRef).toBeTruthy();
    });

    it('Should add status', () => {
        testComponent.status = 'positive';
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--positive')).toBeTrue();
    });

    it('Should add indication color', () => {
        testComponent.indicationColor = 2;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--indication-2')).toBeTrue();
    });

    it('Should add icon', () => {
        testComponent.glyph = 'future';
        fixture.detectChanges();
        const iconElement = fixture.nativeElement.querySelector('i');

        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains('sap-icon--future')).toBeTrue();
    });

    it('Should add inverted class', () => {
        testComponent.inverted = true;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--inverted')).toBeTrue();
    });

    it('Should add large design', () => {
        testComponent.large = true;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--large')).toBeTrue();
    });

    it('Should add clickable class', () => {
        testComponent.clickable = true;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--link')).toBeTrue();
    });

    it('Should display label', () => {
        const label = 'Test label';
        testComponent.label = label;
        fixture.detectChanges();

        const labelTextElement = fixture.nativeElement.querySelector('.fd-object-status__text');

        expect(labelTextElement).toBeTruthy();
        expect(labelTextElement.textContent.trim()).toBe(label);
    });
});
