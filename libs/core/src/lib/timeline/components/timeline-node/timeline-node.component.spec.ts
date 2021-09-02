import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TimelineModule } from '@fundamental-ngx/core/timeline';

describe('TimelineNodeComponent', () => {
    let component: TimeLineNodeTestApp;
    let fixture: ComponentFixture<TimeLineNodeTestApp>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimeLineNodeTestApp],
            imports: [TimelineModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineNodeTestApp);
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
        <div style="width: 300px;">
            <fd-timeline [dataSource]="data">
                <fd-timeline-node *fdTimelineNodeDef="let node" [glyph]="node.glyph"></fd-timeline-node>
            </fd-timeline>
        </div>
    `
})
class TimeLineNodeTestApp {
    data = [{ glyph: 'key' }];
}
