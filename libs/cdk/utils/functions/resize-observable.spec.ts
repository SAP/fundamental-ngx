import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { delayWhen, first } from 'rxjs/operators';
import { resizeObservable } from './resize-observable';

const ELEMENT_DIMENSIONS = { width: 100 };

class MockResizeObserver implements ResizeObserver {
    constructor(public callbackFn: ResizeObserverCallback) {}
    observe(target: Element): void {
        // Mutation observer to observe any changes in the DOM tree
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    const entry: ResizeObserverEntry = {
                        contentRect: new MockDOMRectReadOnly(0, 0, 200, 100),
                        target,
                        borderBoxSize: [],
                        contentBoxSize: [],
                        devicePixelContentBoxSize: []
                    };
                    this.callbackFn([entry], this);
                }
            });
        });
        observer.observe(target, { attributes: true });
    }
    disconnect(): void {}
    unobserve(): void {}
}

class MockDOMRectReadOnly implements DOMRectReadOnly {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    toJSON: () => any;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = y;
        this.right = x + width;
        this.bottom = y + height;
        this.left = x;
        this.toJSON = () => ({
            x: this.x,
            y: this.y,
            idth: this.width,
            height: this.height,
            top: this.top,
            right: this.right,
            bottom: this.bottom,
            left: this.left
        });
    }
}

@Component({
    template: '',
    host: {
        '[style.display]': '"block"',
        '[style.box-sizing]': '"border-box"',
        '[style.width.px]': 'elementDimensions.width'
    },
    standalone: true
})
class TestComponent {
    elementDimensions = ELEMENT_DIMENSIONS;
    constructor(public elementRef: ElementRef) {}
}

describe('Resize Observable utils', () => {
    let elementRef: ElementRef;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        global.window.ResizeObserver = MockResizeObserver;
        fixture = TestBed.createComponent(TestComponent);
        elementRef = fixture.componentInstance.elementRef;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(elementRef).toBeTruthy();
    });

    it('should spy on element resize', (done) => {
        resizeObservable(elementRef.nativeElement)
            .pipe(
                delayWhen(() => from(fixture.whenStable())),
                first()
            )
            .subscribe((entries) => {
                const entry = entries[0];
                expect(entry.contentRect.width).toEqual(200);
                done();
            });

        fixture.componentInstance.elementDimensions.width = 200;
        fixture.detectChanges();
    });
});
