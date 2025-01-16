import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementCapacity, getElementWidth } from './element-size';

const ELEMENT_DIMENSIONS = { width: 100, margin: 2, padding: 5 };
const EXPECTED_CAPACITY = ELEMENT_DIMENSIONS.width - ELEMENT_DIMENSIONS.padding * 2;
const EXPECTED_WIDTH = ELEMENT_DIMENSIONS.width;
const EXPECTED_WIDTH_WITH_MARGIN = ELEMENT_DIMENSIONS.width + ELEMENT_DIMENSIONS.margin * 2;

@Component({
    standalone: true,
    template: '',
    host: {
        '[style.display]': '"block"',
        '[style.box-sizing]': '"border-box"',
        '[style.width]': `elementDimensions.width + 'px'`,
        '[style.margin]': `elementDimensions.margin + 'px'`,
        '[style.padding]': `elementDimensions.padding + 'px'`
    }
})
class TestComponent {
    elementDimensions = ELEMENT_DIMENSIONS;
    constructor(public elementRef: ElementRef) {}
}

describe('Element size utils', () => {
    let elementRef: ElementRef;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        elementRef = fixture.componentInstance.elementRef;
        fixture.detectChanges();
    });

    it('should create element reference', () => {
        expect(elementRef).toBeTruthy();
    });

    it('should return proper capacity', () => {
        expect(getElementCapacity(elementRef)).toEqual(EXPECTED_CAPACITY);
    });

    it('should return proper element width', () => {
        expect(getElementWidth(elementRef)).toEqual(EXPECTED_WIDTH);
        expect(getElementWidth(elementRef, true)).toEqual(EXPECTED_WIDTH_WITH_MARGIN);
    });
});
