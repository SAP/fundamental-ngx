import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TimelineNodeBodyComponent } from './timeline-node-body.component';

describe('TimelineNodeBodyComponent', () => {
    let component: TimeLineNodeBodyTestApp;
    let fixture: ComponentFixture<TimeLineNodeBodyTestApp>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimelineNodeBodyComponent, TimeLineNodeBodyTestApp]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineNodeBodyTestApp);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should collapse extra lines', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const moreBtn = hostEl.querySelectorAll('.fd-text__link--more');
        expect(moreBtn).toBeTruthy();
    });
});

@Component({
    template: `
        <div style="width: 300px;">
            <fd-timeline-node-body [maxLines]="maxLines" [content]="content"></fd-timeline-node-body>
        </div>
    `
})
class TimeLineNodeBodyTestApp {
    maxLines = 2;
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
}
