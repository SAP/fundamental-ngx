import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Output } from '@angular/core';

import { TimelineNodeBodyComponent } from './timeline-node-body.component';
import { TimelinePositionControlService } from '../../services/timeline-position-control.service';

describe('TimelineNodeBodyComponent', () => {
    let component: TimeLineNodeBodyTestComponent;
    let fixture: ComponentFixture<TimeLineNodeBodyTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimelineNodeBodyComponent, MockedTextComponent, TimeLineNodeBodyTestComponent],
            providers: [
                {
                    provide: TimelinePositionControlService,
                    useValue: {
                        calculatePositions: () => void 0
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineNodeBodyTestComponent);
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

    it('should call calculate positions when expanded or collapsed occurs', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const moreBtn = hostEl.querySelector<HTMLAnchorElement>('.fd-text__link--more');
        const calculatePositionsSpy = jest.spyOn(
            fixture.componentInstance.timelinePositionControlService,
            'calculatePositions'
        );
        expect(moreBtn).toBeDefined();
        moreBtn?.click();
        expect(calculatePositionsSpy).toHaveBeenCalledTimes(1);
    });
});

@Component({
    template: `
        <div style="width: 300px;">
            <fd-timeline-node-body [maxLines]="maxLines" [content]="content"></fd-timeline-node-body>
        </div>
    `
})
class TimeLineNodeBodyTestComponent {
    maxLines = 2;
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `;

    constructor(readonly timelinePositionControlService: TimelinePositionControlService) {}
}

@Component({
    selector: 'fd-text',
    template: '<a class="fd-text__link--more" (click)="isCollapsedChange.emit(true)"></a>'
})
class MockedTextComponent {
    @Output() isCollapsedChange = new EventEmitter<boolean>();
}
