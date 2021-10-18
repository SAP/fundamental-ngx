import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { resizeObservable } from './resize-observable';

const ELEMENT_DIMENSIONS = { width: 100, margin: 2, padding: 5 };

@Component({
    template: '',
    host: {
        '[style.display]': '"block"',
        '[style.box-sizing]': '"content-box"',
        '[style.width]': `elementDimensions.width + 'px'`,
        '[style.margin]': `elementDimensions.margin + 'px'`,
        '[style.padding]': `elementDimensions.padding + 'px'`
    }
})
class TestComponent {
    elementDimensions = ELEMENT_DIMENSIONS;
    constructor(public elementRef: ElementRef) {}
}

describe('Resize Observable utils', () => {
    let elementRef: ElementRef;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        elementRef = fixture.componentInstance.elementRef;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(elementRef).toBeTruthy();
    });

    it('should spy on element resize', () => {
        resizeObservable(elementRef.nativeElement).subscribe((entries) => {
            const entry = entries[0];
            expect(entry.contentRect.width).toEqual(200);
        });
        fixture.componentInstance.elementDimensions.width = 200;
    });
});
