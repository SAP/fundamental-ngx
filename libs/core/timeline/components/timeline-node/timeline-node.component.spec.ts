import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineModule } from '../../timeline.module';

describe('TimelineNodeComponent', () => {
    let component: TimeLineNodeTestComponent;
    let fixture: ComponentFixture<TimeLineNodeTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TimeLineNodeTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineNodeTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show node icon', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const nodeIcon = hostEl.querySelectorAll('.fd-timeline__node--icon');
        expect(nodeIcon).toBeTruthy();
    });
});

@Component({
    template: `
        <div [style.width.px]="300">
            <fd-timeline [dataSource]="data">
                <fd-timeline-node *fdTimelineNodeDef="let node" [glyph]="node.glyph"></fd-timeline-node>
            </fd-timeline>
        </div>
    `,
    standalone: true,
    imports: [TimelineModule]
})
class TimeLineNodeTestComponent {
    data = [{ glyph: 'key' }];
}
