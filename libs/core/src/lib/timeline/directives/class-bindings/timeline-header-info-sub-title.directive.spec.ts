import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TimelineModule } from '@fundamental-ngx/core/timeline';

describe('TimelineHeaderInfoSubTitleDirective', () => {
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
        expect(component.ref.nativeElement.className.includes('fd-timeline__post-subheader')).toBe(true);
    });
});

@Component({
    template: `<span #directiveElement fdTimelineHeaderInfoSubTitle>Notification Footer Content Test</span>`
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
