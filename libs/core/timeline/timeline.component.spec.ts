import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TimelineModule } from './';
import { TimelinePositionControlService } from './services/timeline-position-control.service';
import { TimelineAxis, TimelineSidePosition } from './types';

describe('TimelineComponent', () => {
    let component: TimelineTestComponent;
    let fixture: ComponentFixture<TimelineTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimelineTestComponent],
            imports: [TimelineModule],
            providers: [TimelinePositionControlService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create nodes by dataSource', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const nodesCount = hostEl.querySelectorAll('.fd-timeline__node-wrapper').length;
        const dataSourceCount = component.data.length;
        expect(nodesCount).toBeGreaterThan(0);
        expect(nodesCount).toBe(dataSourceCount);
    });

    it('should rerender whole list without trackBy', () => {
        const nodesArr = getNodes(fixture.debugElement.nativeElement);
        nodesArr.forEach((node: Element, index: number) => {
            node.setAttribute('initialIndex', index.toString());
        });

        expect(nodesArr.length).toBe(component.data.length);

        component.data = [{ title: 'Title #1' }, { title: 'Title #2' }, { title: 'Title #3' }];
        fixture.detectChanges();

        const nodeWithInitialIndexAttr = getNodes(fixture.debugElement.nativeElement).filter((node: Element) =>
            node.hasAttribute('initialIndex')
        );

        expect(nodeWithInitialIndexAttr.length).toBe(0);
    });

    it('should create timeline in a horizontal dimension ', () => {
        component.axis = 'horizontal';
        component.layout = 'top';
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const timelineWithHorizontal = hostEl.querySelector('.fd-timeline--horizontal');
        expect(timelineWithHorizontal).not.toBeNull();
    });

    it('should create timeline with double side layout ', () => {
        component.layout = 'double';
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const nodesInFirstList = hostEl.querySelectorAll('.fd-timeline__list--first fd-timeline-node');
        const nodesInSecondList = hostEl.querySelectorAll('.fd-timeline__list--second fd-timeline-node');
        expect(nodesInFirstList.length).toBeGreaterThan(0);
        expect(nodesInSecondList.length).toBeGreaterThan(0);
    });
});

describe('TimelineComponentWithTrackBy', () => {
    let component: TimelineTestWithTrackByComponent;
    let fixture: ComponentFixture<TimelineTestWithTrackByComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimelineTestComponent, TimelineTestWithTrackByComponent],
            imports: [TimelineModule],
            providers: [TimelinePositionControlService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineTestWithTrackByComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should cache existed items by trackBy function', () => {
        const nodesArr = getNodes(fixture.debugElement.nativeElement);
        nodesArr.forEach((node: Element, index: number) => {
            node.setAttribute('initialIndex', index.toString());
        });

        expect(nodesArr.length).toBe(component.data.length);

        component.data = [{ title: 'Title #1' }, { title: 'Title #2' }, { title: 'Title #3' }];
        fixture.detectChanges();

        const nodeWithInitialIndexAttr = getNodes(fixture.debugElement.nativeElement).filter((node: Element) =>
            node.hasAttribute('initialIndex')
        );

        expect(nodeWithInitialIndexAttr.length).toBe(component.data.length);
    });
});

@Component({
    template: `
        <div style="width: 300px;">
            <fd-timeline [dataSource]="data" [axis]="axis" [layout]="layout">
                <fd-timeline-node *fdTimelineNodeDef="let node">
                    {{ node.title }}
                </fd-timeline-node>
            </fd-timeline>
        </div>
    `
})
class TimelineTestComponent {
    data = [{ title: 'Title #1' }, { title: 'Title #2' }, { title: 'Title #3' }];

    axis: TimelineAxis = 'vertical';
    layout: TimelineSidePosition = 'right';
}

@Component({
    template: `
        <div style="width: 300px;">
            <fd-timeline [dataSource]="data" [trackBy]="trackBy">
                <fd-timeline-node *fdTimelineNodeDef="let node">
                    {{ node.title }}
                </fd-timeline-node>
            </fd-timeline>
        </div>
    `
})
class TimelineTestWithTrackByComponent extends TimelineTestComponent {
    enableTrackBy = false;

    trackBy(index: number, item: any): string {
        return item.title;
    }
}

function getNodes(treeElement: Element): HTMLElement[] {
    return Array.from(treeElement.querySelectorAll('.fd-timeline__node-wrapper'));
}
