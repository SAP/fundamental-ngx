import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { OverflowPriority, ResizeObserverService } from '@fundamental-ngx/cdk/utils';
import { whenStable } from '@fundamental-ngx/core/tests';

import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarModule } from './toolbar.module';

export class ResizeObservableServiceMock {
    private readonly observerMap = new Map<Element | ElementRef<Element>, Subject<ResizeObserverEntry[]>>();
    observe(elementOrRef: Element | ElementRef<Element>): Subject<ResizeObserverEntry[]> {
        const subj = new Subject<ResizeObserverEntry[]>();
        this.observerMap.set(elementOrRef, subj);
        return subj;
    }

    trigger(elementOrRef: Element | ElementRef<Element>, data: ResizeObserverEntry[]): void {
        this.observerMap.get(elementOrRef)?.next(data);
    }
}

describe('ToolbarComponent', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarTestComponent;
    let fixture: ComponentFixture<ToolbarTestComponent>;
    let resizeService: ResizeObservableServiceMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarTestComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useClass: ResizeObservableServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        resizeService = TestBed.inject(ResizeObserverService) as any as ResizeObservableServiceMock;

        await whenStable(fixture);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should overflow', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            toolbar.overflowItems$.subscribe((actualOverflowItems) => {
                expect(actualOverflowItems.length).toBeGreaterThan(0);
                doneFn();
            });
            resizeService.trigger(toolbar.elementRef.nativeElement, []);
        });
    });
});

describe('ToolbarComponent - Prioritization', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarOverflowPriorityTestComponent;
    let fixture: ComponentFixture<ToolbarOverflowPriorityTestComponent>;
    let resizeService: ResizeObservableServiceMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarOverflowPriorityTestComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useClass: ResizeObservableServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        jest.spyOn(ToolbarItemDirective.prototype, 'width', 'get').mockImplementation(() => 150);
        jest.spyOn(ToolbarComponent.prototype as any, '_toolbarWidth', 'get').mockImplementation(() => 450);
        fixture = TestBed.createComponent(ToolbarOverflowPriorityTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        // In Angular 21, manually assigning QueryLists no longer works correctly
        // The toolbarItems will be populated automatically via @ContentChildren
        resizeService = TestBed.inject(ResizeObserverService) as any as ResizeObservableServiceMock;

        await whenStable(fixture);
    });

    it('should hide element to overflow by priority', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            const overflownItems: OverflowPriority[] = ['high', 'high', 'low', 'disappear', 'always'];
            toolbar.overflowItems$.subscribe((actualOverflownItems) => {
                expect(actualOverflownItems.length).toBeGreaterThan(0);

                expect(actualOverflownItems.map((el) => el.priority)).toEqual(overflownItems);
                doneFn();
            });
            resizeService.trigger(toolbar.elementRef.nativeElement, []);
        });
    });
});

describe('ToolbarComponent - Prioritization and Grouping', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarOverflowGroupingTestComponent;
    let fixture: ComponentFixture<ToolbarOverflowGroupingTestComponent>;
    let resizeService: ResizeObservableServiceMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarOverflowGroupingTestComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useClass: ResizeObservableServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        jest.spyOn(ToolbarItemDirective.prototype, 'width', 'get').mockImplementation(() => 150);
        jest.spyOn(ToolbarComponent.prototype as any, '_toolbarWidth', 'get').mockImplementation(() => 600);

        fixture = TestBed.createComponent(ToolbarOverflowGroupingTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        resizeService = TestBed.inject(ResizeObserverService) as any as ResizeObservableServiceMock;

        await whenStable(fixture);
    });

    it('should hide elements to overflow by group and priority', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            const expectedOverflownItems: `${number} / ${OverflowPriority}`[] = [
                '1 / high',
                '2 / low',
                '2 / low',
                '1 / low',
                '2 / disappear',
                '0 / always'
            ];
            toolbar.overflowItems$.subscribe((actualOverflownItems) => {
                expect(actualOverflownItems.length).toBeGreaterThan(0);

                expect(actualOverflownItems.map((el) => `${el.group} / ${el.priority}`)).toEqual(
                    expectedOverflownItems
                );
                doneFn();
            });
            resizeService.trigger(toolbar.elementRef.nativeElement, []);
        });
    });
});

/* Basic toolbar */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item>Button1</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item>Button2</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item>Button3</button>
                <button fd-toolbar-item>Button4</button>

                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>

                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>

                <button fd-toolbar-item>Button5</button>
                <button fd-toolbar-item>Button6</button>
                <button fd-toolbar-item>Button7</button>
                <button fd-toolbar-item>Button8</button>
                <button fd-toolbar-item>Button9</button>
                <button fd-toolbar-item>Button10</button>
                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>
                <button fd-toolbar-item>Button11</button>
                <button fd-toolbar-item>Button12</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item>Button13</button>
                <button fd-toolbar-item>Button14</button>
                <button fd-toolbar-item>Button15</button>
                <button fd-toolbar-item>Button16</button>
                <button fd-toolbar-item>Button17</button>
                <button fd-toolbar-item>Button18</button>
                <button fd-toolbar-item>Button19</button>
                <button fd-toolbar-item>Button20</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
            </fd-toolbar>
        </div>
    `,
    standalone: true,
    imports: [ToolbarModule]
})
class ToolbarTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) children: QueryList<ToolbarItemDirective>;

    width = '300px';
}

/* Toolbar with prioritization */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item>Button First</button>
                <button fd-toolbar-item fdOverflowPriority="always">Always</button>
                <button fd-toolbar-item fdOverflowPriority="never">Never</button>
                <button fd-toolbar-item fdOverflowPriority="low">Low</button>
                <button fd-toolbar-item fdOverflowPriority="high">High</button>
                <button fd-toolbar-item fdOverflowPriority="disappear">Disappear</button>
                <button fd-toolbar-item>Button Last</button>
            </fd-toolbar>
        </div>
    `,
    standalone: true,
    imports: [ToolbarModule]
})
class ToolbarOverflowPriorityTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) children: QueryList<ToolbarItemDirective>;

    width = '300px';
}

/* Toolbar with prioritization and grouping */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item>Button</button>
                <button fd-toolbar-item fdOverflowPriority="always">Always</button>
                <button fd-toolbar-item fdOverflowPriority="never">Never</button>
                <button fd-toolbar-item fdOverflowPriority="low" [fdOverflowGroup]="1">Gr 1 / Low</button>
                <button fd-toolbar-item fdOverflowPriority="low" [fdOverflowGroup]="2">Gr 2 / Low</button>
                <button fd-toolbar-item fdOverflowPriority="disappear" [fdOverflowGroup]="2">Gr 2 / Disappear</button>
                <button fd-toolbar-item fdOverflowPriority="low" [fdOverflowGroup]="2">Gr 2 / Low</button>
                <button fd-toolbar-item fdOverflowPriority="high" [fdOverflowGroup]="1">Gr 1 / High</button>
            </fd-toolbar>
        </div>
    `,
    standalone: true,
    imports: [ToolbarModule]
})
class ToolbarOverflowGroupingTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) children: QueryList<ToolbarItemDirective>;

    width = '400px';
}

class MockIntersectionObserver implements IntersectionObserver {
    root: Element | Document | null = null;
    rootMargin = '';
    thresholds: readonly number[] = [];
    targets: Element[] = [];
    constructor(public callbackFn: IntersectionObserverCallback) {}
    disconnect(): void {}
    observe(target: Element): void {
        (target as any)._intersectionTrigger = (isIntersecting: boolean) => {
            this.callbackFn(
                [
                    {
                        target,
                        isIntersecting,
                        boundingClientRect: {} as DOMRectReadOnly,
                        intersectionRatio: isIntersecting ? 1 : 0,
                        intersectionRect: {} as DOMRectReadOnly,
                        rootBounds: null,
                        time: Date.now()
                    }
                ],
                this
            );
        };
        this.targets.push(target);
    }
    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
    unobserve(): void {}
}

/* Toolbar for visibility detection testing */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item>Button1</button>
                <button fd-toolbar-item>Button2</button>
                <button fd-toolbar-item>Button3</button>
            </fd-toolbar>
        </div>
    `,
    standalone: true,
    imports: [ToolbarModule]
})
class ToolbarVisibilityTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    width = '300px';
}

describe('ToolbarComponent - Visibility Detection', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarVisibilityTestComponent;
    let fixture: ComponentFixture<ToolbarVisibilityTestComponent>;
    let originalIntersectionObserver: typeof IntersectionObserver;

    beforeEach(waitForAsync(() => {
        // Store original IntersectionObserver and replace with mock
        originalIntersectionObserver = global.window.IntersectionObserver;
        global.window.IntersectionObserver = MockIntersectionObserver as any;

        TestBed.configureTestingModule({
            imports: [ToolbarVisibilityTestComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useClass: ResizeObservableServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarVisibilityTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;

        await whenStable(fixture);
    });

    afterEach(() => {
        // Restore original IntersectionObserver
        global.window.IntersectionObserver = originalIntersectionObserver;
    });

    it('should trigger overflow recalculation when toolbar becomes visible', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            const refreshSubject = (toolbar as any)._refreshOverflow$;
            const nextSpy = jest.spyOn(refreshSubject, 'next');

            // Simulate the toolbar becoming visible via IntersectionObserver
            const nativeElement = toolbar.elementRef.nativeElement;
            if ((nativeElement as any)._intersectionTrigger) {
                (nativeElement as any)._intersectionTrigger(true);
            }

            fixture.detectChanges();

            // The refresh should have been triggered
            expect(nextSpy).toHaveBeenCalled();
            doneFn();
        });
    });

    it('should not trigger overflow recalculation when toolbar is not visible', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            const refreshSubject = (toolbar as any)._refreshOverflow$;
            const nextSpy = jest.spyOn(refreshSubject, 'next');

            // Simulate the toolbar being not visible via IntersectionObserver
            const nativeElement = toolbar.elementRef.nativeElement;
            if ((nativeElement as any)._intersectionTrigger) {
                (nativeElement as any)._intersectionTrigger(false);
            }

            fixture.detectChanges();

            // The refresh should not have been triggered
            expect(nextSpy).not.toHaveBeenCalled();
            doneFn();
        });
    });

    it('should not trigger overflow recalculation when it should not overflow', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            const refreshSubject = (toolbar as any)._refreshOverflow$;
            const nextSpy = jest.spyOn(refreshSubject, 'next');

            // Set shouldOverflow to false and trigger visibility change
            toolbar.shouldOverflow = false;
            const nativeElement = toolbar.elementRef.nativeElement;
            if ((nativeElement as any)._intersectionTrigger) {
                (nativeElement as any)._intersectionTrigger(true);
            }

            fixture.detectChanges();

            // The refresh should not have been triggered since shouldOverflow is false
            expect(nextSpy).not.toHaveBeenCalled();
            doneFn();
        });
    });
});

/* Toolbar with title */
@Component({
    template: `
        <fd-toolbar #toolbar [title]="title">
            <button fd-toolbar-item>Button1</button>
        </fd-toolbar>
    `,
    standalone: true,
    imports: [ToolbarModule]
})
class ToolbarWithTitleTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    title = 'Test Toolbar Title';
}

describe('ToolbarComponent - Title Accessibility', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarWithTitleTestComponent;
    let fixture: ComponentFixture<ToolbarWithTitleTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarWithTitleTestComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useClass: ResizeObservableServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarWithTitleTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;

        await whenStable(fixture);
    });

    it('should render title element with title attribute for tooltip', () => {
        const titleElement = fixture.debugElement.query(By.css('.fd-toolbar__title'));
        expect(titleElement).toBeTruthy();
        expect(titleElement.nativeElement.getAttribute('title')).toBe('Test Toolbar Title');
    });

    it('should render title element with aria-label for screen readers', () => {
        const titleElement = fixture.debugElement.query(By.css('.fd-toolbar__title'));
        expect(titleElement).toBeTruthy();
        expect(titleElement.nativeElement.getAttribute('aria-label')).toBe('Test Toolbar Title');
    });

    it('should apply truncate class to title element', () => {
        const titleElement = fixture.debugElement.query(By.css('.fd-toolbar__title'));
        expect(titleElement).toBeTruthy();
        expect(titleElement.nativeElement.classList.contains('fd-toolbar__title--truncate')).toBe(true);
    });

    it('should update title and aria-label when title input changes', async () => {
        component.title = 'Updated Title';
        fixture.detectChanges();
        await whenStable(fixture);

        const titleElement = fixture.debugElement.query(By.css('.fd-toolbar__title'));
        expect(titleElement.nativeElement.getAttribute('title')).toBe('Updated Title');
        expect(titleElement.nativeElement.getAttribute('aria-label')).toBe('Updated Title');
    });

    it('should have ViewChild reference to title element', () => {
        expect(toolbar.titleElement).toBeTruthy();
        expect(toolbar.titleElement.nativeElement).toBeTruthy();
    });
});

/* Toolbar with title and overflow for resize testing */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [title]="title" [shouldOverflow]="true">
                <button fd-toolbar-item>Button1</button>
                <button fd-toolbar-item>Button2</button>
                <button fd-toolbar-item>Button3</button>
            </fd-toolbar>
        </div>
    `,
    standalone: true,
    imports: [ToolbarModule]
})
class ToolbarTitleResizeTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    title = 'Test Title';
    width = '500px';
}

describe('ToolbarComponent - Title Element Resize Observation', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarTitleResizeTestComponent;
    let fixture: ComponentFixture<ToolbarTitleResizeTestComponent>;
    let resizeService: ResizeObservableServiceMock;
    let originalIntersectionObserver: typeof IntersectionObserver;

    beforeEach(waitForAsync(() => {
        // Mock IntersectionObserver
        originalIntersectionObserver = global.window.IntersectionObserver;
        global.window.IntersectionObserver = MockIntersectionObserver as any;

        TestBed.configureTestingModule({
            imports: [ToolbarTitleResizeTestComponent],
            providers: [
                {
                    provide: ResizeObserverService,
                    useClass: ResizeObservableServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarTitleResizeTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        resizeService = TestBed.inject(ResizeObserverService) as any as ResizeObservableServiceMock;

        await whenStable(fixture);
    });

    afterEach(() => {
        global.window.IntersectionObserver = originalIntersectionObserver;
    });

    it('should observe title element with ResizeObserverService', () => {
        // The title element should be observed by the resize service
        const titleElement = toolbar.titleElement?.nativeElement;
        expect(titleElement).toBeTruthy();

        // Verify that the observerMap in the mock contains the title element
        const observerMap = (resizeService as any).observerMap as Map<Element, Subject<any>>;
        expect(observerMap.has(titleElement)).toBe(true);
    });

    it('should observe both toolbar container and title element', () => {
        const observerMap = (resizeService as any).observerMap as Map<Element, Subject<any>>;

        // Should observe the toolbar container
        expect(observerMap.has(toolbar.elementRef.nativeElement)).toBe(true);

        // Should observe the title element
        const titleElement = toolbar.titleElement?.nativeElement;
        expect(observerMap.has(titleElement)).toBe(true);
    });
});
