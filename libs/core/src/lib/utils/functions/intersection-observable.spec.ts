import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { delayWhen, first } from 'rxjs/operators';

import { intersectionObservable } from '@fundamental-ngx/core';

const ELEMENT_DISPLAY: 'none' | 'block' = 'none';

@Component({
    template: '',
    host: {
        '[style.display]': 'elementDisplay',
        '[style.box-sizing]': '"border-box"',
        '[style.width.px]': '100',
        '[style.height.px]': '100'
    }
})
class TestComponent {
    elementDisplay = ELEMENT_DISPLAY;

    get width(): number {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }

    constructor(public elementRef: ElementRef) {}
}

describe('Intersection Observable utils', () => {
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

    it('should spy on element intersection', (done) => {
        intersectionObservable(elementRef.nativeElement)
            .pipe(
                delayWhen(() => from(fixture.whenStable())),
                first()
            )
            .subscribe((entries) => {
                const entry = entries[0];
                expect(entry.boundingClientRect.width).toEqual(fixture.componentInstance.width);
                done();
            });

        expect(fixture.componentInstance.width).toEqual(0);

        fixture.componentInstance.elementDisplay = 'block';
        fixture.detectChanges();
    });
});
