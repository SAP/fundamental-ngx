import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { whenStable } from '@fundamental-ngx/core/tests';
import { ToolbarComponent, ToolbarItemDirective, ToolbarModule } from '@fundamental-ngx/core/toolbar';

describe('ToolbarComponent', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarTestComponent;
    let fixture: ComponentFixture<ToolbarTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ToolbarTestComponent],
            imports: [ToolbarModule, ButtonModule]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        toolbar.toolbarItems = component.childrens;

        await whenStable(fixture);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should overflow', async () => {
        expect(toolbar['_overflowElements'].length).toBeGreaterThan(0);
    });
});

describe('ToolbarComponent - Prioritization', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarOverflowPriorityTestComponent;
    let fixture: ComponentFixture<ToolbarOverflowPriorityTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarModule, ButtonModule],
            declarations: [ToolbarOverflowPriorityTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarOverflowPriorityTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        toolbar.toolbarItems = component.childrens;

        await whenStable(fixture);
    });

    it('should hide element to overflow by priority', async () => {
        const normalElements = ['Button First', 'Never', 'High'];
        const overflowElements = ['Always', 'Low', 'Button Last'];
        const disappearElements = ['Disappear'];

        expect(toolbar['_overflowElements'].length).toBeGreaterThan(0);
        expect(toolbar['_normalElements'].length).toBeGreaterThan(0);
        expect(toolbar['_disappearElements'].length).toBeGreaterThan(0);

        expect(toolbar['_overflowElements'].map((el) => el.elementRef.nativeElement.textContent?.trim())).toEqual(
            overflowElements
        );
        expect(toolbar['_normalElements'].map((el) => el.elementRef.nativeElement.textContent?.trim())).toEqual(
            normalElements
        );
        expect(toolbar['_disappearElements'].map((el) => el.elementRef.nativeElement.textContent?.trim())).toEqual(
            disappearElements
        );
    });
});

describe('ToolbarComponent - Prioritization and Grouping', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarOverflowGroupingTestComponent;
    let fixture: ComponentFixture<ToolbarOverflowGroupingTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarModule, ButtonModule],
            declarations: [ToolbarOverflowGroupingTestComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarOverflowGroupingTestComponent);

        await whenStable(fixture);

        component = fixture.componentInstance;
        toolbar = component.toolbar;
        toolbar.toolbarItems = component.childrens;

        await whenStable(fixture);
    });

    it('should hide elements to overflow by group and priority', async () => {
        const normalElements = ['Button', 'Never', 'Gr 1 / Low', 'Gr 1 / High'];
        const overflowElements = ['Always', 'Gr 2 / Low', 'Gr 2 / Low'];
        const disappearElements = ['Gr 2 / Disappear'];

        expect(toolbar['_overflowElements'].length).toBeGreaterThan(0);
        expect(toolbar['_normalElements'].length).toBeGreaterThan(0);
        expect(toolbar['_disappearElements'].length).toBeGreaterThan(0);

        expect(toolbar['_overflowElements'].map((el) => el.elementRef.nativeElement.textContent?.trim())).toEqual(
            overflowElements
        );
        expect(toolbar['_normalElements'].map((el) => el.elementRef.nativeElement.textContent?.trim())).toEqual(
            normalElements
        );
        expect(toolbar['_disappearElements'].map((el) => el.elementRef.nativeElement.textContent?.trim())).toEqual(
            disappearElements
        );
    });
});

/* Basic toolbar */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item fd-button fdCompact>Button1</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button fdCompact>Button2</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button fdCompact>Button3</button>
                <button fd-toolbar-item fd-button fdCompact>Button4</button>

                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>

                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>

                <button fd-toolbar-item fd-button fdCompact>Button5</button>
                <button fd-toolbar-item fd-button fdCompact>Button6</button>
                <button fd-toolbar-item fd-button fdCompact>Button7</button>
                <button fd-toolbar-item fd-button fdCompact>Button8</button>
                <button fd-toolbar-item fd-button fdCompact>Button9</button>
                <button fd-toolbar-item fd-button fdCompact>Button10</button>
                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>
                <button fd-toolbar-item fd-button fdCompact>Button11</button>
                <button fd-toolbar-item fd-button fdCompact>Button12</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button fdCompact>Button13</button>
                <button fd-toolbar-item fd-button fdCompact>Button14</button>
                <button fd-toolbar-item fd-button fdCompact>Button15</button>
                <button fd-toolbar-item fd-button fdCompact>Button16</button>
                <button fd-toolbar-item fd-button fdCompact>Button17</button>
                <button fd-toolbar-item fd-button fdCompact>Button18</button>
                <button fd-toolbar-item fd-button fdCompact>Button19</button>
                <button fd-toolbar-item fd-button fdCompact>Button20</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
            </fd-toolbar>
        </div>
    `
})
class ToolbarTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) childrens: QueryList<ToolbarItemDirective>;

    width = '300px';
}

/* Toolbar with prioritization */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item fd-button fdCompact>Button First</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="always">Always</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="never">Never</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="low">Low</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="high">High</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="disappear">Disappear</button>
                <button fd-toolbar-item fd-button fdCompact>Button Last</button>
            </fd-toolbar>
        </div>
    `
})
class ToolbarOverflowPriorityTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) childrens: QueryList<ToolbarItemDirective>;

    width = '300px';
}

/* Toolbar with prioritization and grouping */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item fd-button fdCompact>Button</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="always">Always</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="never">Never</button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="low" fdOverflowGroup="1">
                    Gr 1 / Low
                </button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="low" fdOverflowGroup="2">
                    Gr 2 / Low
                </button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="disappear" fdOverflowGroup="2">
                    Gr 2 / Disappear
                </button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="low" fdOverflowGroup="2">
                    Gr 2 / Low
                </button>
                <button fd-toolbar-item fd-button fdCompact fdOverflowPriority="high" fdOverflowGroup="1">
                    Gr 1 / High
                </button>
            </fd-toolbar>
        </div>
    `
})
class ToolbarOverflowGroupingTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) childrens: QueryList<ToolbarItemDirective>;

    width = '400px';
}
