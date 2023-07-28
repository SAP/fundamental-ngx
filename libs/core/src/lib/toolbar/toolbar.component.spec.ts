import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { whenStable } from '@fundamental-ngx/core/tests';
import { OverflowPriority, ResizeObserverService } from '@fundamental-ngx/cdk/utils';

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
            declarations: [ToolbarTestComponent],
            imports: [ToolbarModule],
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
            resizeService.trigger(toolbar.toolbar.nativeElement, []);
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
            imports: [ToolbarModule],
            declarations: [ToolbarOverflowPriorityTestComponent],
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
        toolbar.toolbarItems = component.children;
        resizeService = TestBed.inject(ResizeObserverService) as any as ResizeObservableServiceMock;

        await whenStable(fixture);
    });

    it('should hide element to overflow by priority', (doneFn) => {
        fixture.whenRenderingDone().then(() => {
            const overflownItems: OverflowPriority[] = ['high', 'low', 'disappear', 'always'];
            toolbar.overflowItems$.subscribe((actualOverflownItems) => {
                expect(actualOverflownItems.length).toBeGreaterThan(0);

                expect(actualOverflownItems.map((el) => el.priority)).toEqual(overflownItems);
                doneFn();
            });
            resizeService.trigger(toolbar.toolbar.nativeElement, []);
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
            imports: [ToolbarModule],
            declarations: [ToolbarOverflowGroupingTestComponent],
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
                '2 / low',
                '2 / low',
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
            resizeService.trigger(toolbar.toolbar.nativeElement, []);
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
    `
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
    `
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
    `
})
class ToolbarOverflowGroupingTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) children: QueryList<ToolbarItemDirective>;

    width = '400px';
}
