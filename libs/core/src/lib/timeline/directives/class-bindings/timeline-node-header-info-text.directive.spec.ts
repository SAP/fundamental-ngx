import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TimelineModule } from '../../timeline.module';
import { Component, ElementRef, ViewChild } from '@angular/core';

describe('TimelineNodeHeaderInfoTextDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TimelineModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component.ref.nativeElement).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className.includes('fd-timeline__post-header-text')).toBe(true);
    });
});

@Component({
    template: `<span #directiveElement fdTimelineNodeHeaderInfoText>Notification Footer Content Test</span>`
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
