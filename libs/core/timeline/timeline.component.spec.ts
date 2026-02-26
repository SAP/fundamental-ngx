import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineNodeComponent } from './components/timeline-node/timeline-node.component';
import { TimelineNodeDefDirective } from './directives/timeline-node-def.directive';
import { TimelinePositionControlService } from './services/timeline-position-control.service';
import { TimelineComponent } from './timeline.component';
import { TimelineModule } from './timeline.module';
import { TimelineAxis, TimelineSidePosition } from './types';

describe('TimelineComponent', () => {
    let component: TimelineTestComponent;
    let fixture: ComponentFixture<TimelineTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TimelineTestComponent],
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

    it('should create timeline in a horizontal dimension', () => {
        component.axis = 'horizontal';
        component.layout = 'top';
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const timelineWithHorizontal = hostEl.querySelector('.fd-timeline--horizontal');
        expect(timelineWithHorizontal).not.toBeNull();
    });

    it('should create timeline with double side layout', () => {
        component.layout = 'double';
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const nodesInFirstList = hostEl.querySelectorAll('.fd-timeline__list--first .fd-timeline__node-wrapper');
        const nodesInSecondList = hostEl.querySelectorAll('.fd-timeline__list--second .fd-timeline__node-wrapper');
        expect(nodesInFirstList.length).toBeGreaterThan(0);
        expect(nodesInSecondList.length).toBeGreaterThan(0);
    });
});

describe('TimelineComponentLoading', () => {
    let component: TimelineLoadingTestComponent;
    let fixture: ComponentFixture<TimelineLoadingTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TimelineLoadingTestComponent],
            providers: [TimelinePositionControlService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineLoadingTestComponent);
        component = fixture.componentInstance;
    });

    it('should show loading skeleton with 3 repeated nodes when dataSource becomes null', () => {
        // First initialize with data
        component.data = [{ title: 'Title #1' }];
        fixture.detectChanges();

        // Then set to null to trigger loading state
        component.data = null as any;
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const skeletonNodes = hostEl.querySelectorAll('fd-timeline-node fd-skeleton');

        // Each loading node has 2 skeletons (header and body), and there are 3 repeated nodes
        expect(skeletonNodes.length).toBe(6);
    });

    it('should hide loading skeleton when dataSource is provided', () => {
        component.data = [{ title: 'Title #1' }];
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const actualNodes = hostEl.querySelectorAll('.fd-timeline__node-wrapper');

        expect(actualNodes.length).toBe(1);
    });
});

describe('TimelineComponentWithTrackBy', () => {
    let component: TimelineTestWithTrackByComponent;
    let fixture: ComponentFixture<TimelineTestWithTrackByComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TimelineModule, TimelineTestWithTrackByComponent],
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
        <div [style.width.px]="300">
            <fd-timeline [dataSource]="data" [axis]="axis" [layout]="layout">
                <fd-timeline-node *fdTimelineNodeDef="let node">
                    {{ node.title }}
                </fd-timeline-node>
            </fd-timeline>
        </div>
    `,
    standalone: true,
    imports: [TimelineComponent, TimelineNodeDefDirective, TimelineNodeComponent, TimelineTestComponent]
})
class TimelineTestComponent {
    data = [{ title: 'Title #1' }, { title: 'Title #2' }, { title: 'Title #3' }];

    axis: TimelineAxis = 'vertical';
    layout: TimelineSidePosition = 'right';
}

@Component({
    template: `
        <div [style.width.px]="300">
            <fd-timeline [dataSource]="data" [trackBy]="trackBy">
                <fd-timeline-node *fdTimelineNodeDef="let node">
                    {{ node.title }}
                </fd-timeline-node>
            </fd-timeline>
        </div>
    `,
    standalone: true,
    imports: [TimelineComponent, TimelineNodeDefDirective, TimelineNodeComponent, TimelineTestComponent]
})
class TimelineTestWithTrackByComponent extends TimelineTestComponent {
    enableTrackBy = false;

    trackBy(index: number, item: any): string {
        return item.title;
    }
}

@Component({
    template: `
        <div [style.width.px]="300">
            <fd-timeline [dataSource]="data" [axis]="axis" [layout]="layout">
                <fd-timeline-node *fdTimelineNodeDef="let node">
                    {{ node.title }}
                </fd-timeline-node>
            </fd-timeline>
        </div>
    `,
    standalone: true,
    imports: [TimelineComponent, TimelineNodeDefDirective, TimelineNodeComponent]
})
class TimelineLoadingTestComponent {
    data: { title: string }[] | null = null;

    axis: TimelineAxis = 'vertical';
    layout: TimelineSidePosition = 'right';
}

function getNodes(treeElement: Element): HTMLElement[] {
    return Array.from(treeElement.querySelectorAll('.fd-timeline__node-wrapper'));
}
