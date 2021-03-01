import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewChild, Component, ViewChildren, QueryList } from '@angular/core';

import { whenStable } from '../utils/tests/when-stable';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarSpacerComponent } from './toolbar-spacer.component';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';
import { ToolbarOverflowPriorityDirective } from './toolbar-overflow-priority.directive';
import { ToolbarOverflowGroupDirective } from './toolbar-overflow-group.directive';

describe('ToolbarComponent', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarTestComponent;
    let fixture: ComponentFixture<ToolbarTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent,
                ToolbarTestComponent,
                ToolbarItemDirective,
                ToolbarOverflowPriorityDirective,
                ToolbarOverflowGroupDirective,
                ToolbarSpacerComponent,
                ToolbarSeparatorComponent
            ]
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
            declarations: [
                ToolbarComponent,
                ToolbarOverflowPriorityTestComponent,
                ToolbarItemDirective,
                ToolbarOverflowPriorityDirective,
                ToolbarOverflowGroupDirective,
                ToolbarSpacerComponent,
                ToolbarSeparatorComponent
            ]
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

        expect(toolbar['_overflowElements'].map(el => el.elementRef.nativeElement.textContent)).toEqual(overflowElements);
        expect(toolbar['_normalElements'].map(el => el.elementRef.nativeElement.textContent)).toEqual(normalElements);
        expect(toolbar['_disappearElements'].map(el => el.elementRef.nativeElement.textContent)).toEqual(disappearElements);
    });
});

describe('ToolbarComponent - Prioritization and Grouping', () => {
    let toolbar: ToolbarComponent;
    let component: ToolbarOverflowGroupingTestComponent;
    let fixture: ComponentFixture<ToolbarOverflowGroupingTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent,
                ToolbarOverflowGroupingTestComponent,
                ToolbarItemDirective,
                ToolbarOverflowPriorityDirective,
                ToolbarOverflowGroupDirective,
                ToolbarSpacerComponent,
                ToolbarSeparatorComponent
            ]
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

        expect(toolbar['_overflowElements'].map(el => el.elementRef.nativeElement.textContent)).toEqual(overflowElements);
        expect(toolbar['_normalElements'].map(el => el.elementRef.nativeElement.textContent)).toEqual(normalElements);
        expect(toolbar['_disappearElements'].map(el => el.elementRef.nativeElement.textContent)).toEqual(disappearElements);
    });
});

/* Basic toolbar */
@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item fd-button [compact]="true">Button1</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button [compact]="true">Button2</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button [compact]="true">Button3</button>
                <button fd-toolbar-item fd-button [compact]="true">Button4</button>

                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>

                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>

                <button fd-toolbar-item fd-button [compact]="true">Button5</button>
                <button fd-toolbar-item fd-button [compact]="true">Button6</button>
                <button fd-toolbar-item fd-button [compact]="true">Button7</button>
                <button fd-toolbar-item fd-button [compact]="true">Button8</button>
                <button fd-toolbar-item fd-button [compact]="true">Button9</button>
                <button fd-toolbar-item fd-button [compact]="true">Button10</button>
                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>
                <button fd-toolbar-item fd-button [compact]="true">Button11</button>
                <button fd-toolbar-item fd-button [compact]="true">Button12</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button [compact]="true">Button13</button>
                <button fd-toolbar-item fd-button [compact]="true">Button14</button>
                <button fd-toolbar-item fd-button [compact]="true">Button15</button>
                <button fd-toolbar-item fd-button [compact]="true">Button16</button>
                <button fd-toolbar-item fd-button [compact]="true">Button17</button>
                <button fd-toolbar-item fd-button [compact]="true">Button18</button>
                <button fd-toolbar-item fd-button [compact]="true">Button19</button>
                <button fd-toolbar-item fd-button [compact]="true">Button20</button>
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
                <button fd-toolbar-item fd-button [compact]="true">Button First</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="always">Always</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="never">Never</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="low">Low</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="high">High</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="disappear">Disappear</button>
                <button fd-toolbar-item fd-button [compact]="true">Button Last</button>
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
                <button fd-toolbar-item fd-button [compact]="true">Button</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="always">Always</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="never">Never</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="low" fdOverflowGroup="1">Gr 1 / Low</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="low" fdOverflowGroup="2">Gr 2 / Low</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="disappear" fdOverflowGroup="2">Gr 2 / Disappear</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="low" fdOverflowGroup="2" >Gr 2 / Low</button>
                <button fd-toolbar-item fd-button [compact]="true" fdOverflowPriority="high" fdOverflowGroup="1">Gr 1 / High</button>
            </fd-toolbar>
        </div>
    `
})
class ToolbarOverflowGroupingTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) childrens: QueryList<ToolbarItemDirective>;

    width = '400px';
}
