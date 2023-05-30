import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { delayWhen, first } from 'rxjs/operators';
import { resizeObservable } from './resize-observable';

const ELEMENT_DIMENSIONS = { width: 100 };

class MockResizeObserver implements ResizeObserver {
    constructor(public callbackFn: ResizeObserverCallback) {}

    observe(target: Element, options?: ResizeObserverOptions): void {
        // Mutation observer observer any changes in DOM tree
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    const entry = {
                        contentRect: {
                            width: 200
                        },
                        target
                    } as ResizeObserverEntry;
                    this.callbackFn([entry], this);
                }
            });
        });

        observer.observe(target, { attributes: true });
    }

    disconnect(): void {}

    unobserve(target: Element): void {}
}

@Component({
    template: '',
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[style.display]': '"block"',
        '[style.box-sizing]': '"border-box"',
        '[style.width]': `elementDimensions.width + 'px'`
    }
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
            declarations: [TestComponent]
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
