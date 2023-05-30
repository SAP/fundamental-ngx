import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { delayWhen, first } from 'rxjs/operators';

import { intersectionObservable } from './intersection-observable';

const ELEMENT_DISPLAY: 'none' | 'block' = 'none';

class MockIntersectionObserver implements IntersectionObserver {
    root: Element | Document | null;
    rootMargin: string;
    thresholds: readonly number[];
    targets: Element[] = [];
    constructor(public callbackFn: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
    disconnect(): void {}
    observe(target: Element): void {
        target['trigger'] = () => {
            this.trigger();
        };
        this.targets.push(target);
    }
    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
    unobserve(target: Element): void {}
    trigger(): void {
        this.callbackFn(
            this.targets.map(
                (target) =>
                    ({
                        target,
                        boundingClientRect: {
                            width: 100
                        }
                    } as IntersectionObserverEntry)
            ),
            this
        );
    }
}

@Component({
    template: '',
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
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
        return this.elementDisplay === 'block' ? 100 : 0;
    }

    constructor(public elementRef: ElementRef) {}
}

describe('Intersection Observable utils', () => {
    let elementRef: ElementRef;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        global.window.IntersectionObserver = MockIntersectionObserver;
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
        (elementRef.nativeElement as any).trigger();
    });
});
