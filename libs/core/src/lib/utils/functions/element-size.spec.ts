import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { getElementCapacity, getElementWidth } from './element-size';

const ELEMENT_DIMENSIONS = { width: 100, margin: 2, padding: 5 };

@Component({
    template: '',
    host: {
        '[style.display]': '"block"',
        '[style.box-sizing]': '"border-box"',
        '[style.width]': `elementDimensions.width + 'px'`,
        '[style.margin]': `elementDimensions.margin + 'px'`,
        '[style.padding]': `elementDimensions.padding + 'px'`,
    }
})
class TestComponent {
    elementDimensions = ELEMENT_DIMENSIONS;
    constructor(public elementRef: ElementRef) {}
}

describe('Element size utils', () => {
    let elementRef: ElementRef;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        elementRef = fixture.componentInstance.elementRef;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(elementRef).toBeTruthy();
    });

    it('should return proper capacity', () => {
        const capacity = ELEMENT_DIMENSIONS.width - ELEMENT_DIMENSIONS.padding * 2;

        expect(getElementCapacity(elementRef)).toEqual(capacity);
    });

    it('should return proper element width', () => {
        const width = ELEMENT_DIMENSIONS.width;
        const widthWithMargin = ELEMENT_DIMENSIONS.width + ELEMENT_DIMENSIONS.margin * 2;

        expect(getElementWidth(elementRef)).toEqual(width);
        expect(getElementWidth(elementRef, true)).toEqual(widthWithMargin);
    });
});
