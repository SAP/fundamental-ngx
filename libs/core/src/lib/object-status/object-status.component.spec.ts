import { Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObjectStatusComponent } from './object-status.component';

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
            declarations: [ObjectStatusComponent, TestObjectStatusComponent],
            schemas: [NO_ERRORS_SCHEMA]
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
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--positive')).toBe(true);
    });

    it('Should add indication color', () => {
        testComponent.indicationColor = 2;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--indication-2')).toBe(true);
    });

    it('Should add icon', () => {
        testComponent.glyph = 'future';
        fixture.detectChanges();
        const iconElement = fixture.nativeElement.querySelector('fd-icon');

        expect(iconElement).toBeTruthy();
        // expect(iconElement.getAttribute('glyph')).toBe('future');
    });

    it('Should add inverted class', () => {
        testComponent.inverted = true;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--inverted')).toBe(true);
    });

    it('Should add large design', () => {
        testComponent.large = true;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--large')).toBe(true);
    });

    it('Should add clickable class', () => {
        testComponent.clickable = true;
        fixture.detectChanges();
        expect(objectStatusElementRef.nativeElement.classList.contains('fd-object-status--link')).toBe(true);
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
