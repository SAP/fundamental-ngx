import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IllustratedMessageSectionComponent } from './illustrated-message-section.component';

// Mock component for testing
@Component({
    template: ` <section fd-illustrated-message-section [responsive]="responsive">Test content</section> `,
    standalone: true,
    imports: [IllustratedMessageSectionComponent]
})
class TestIllustratedMessageSectionComponent {
    @ViewChild(IllustratedMessageSectionComponent, { static: true, read: ElementRef })
    illustratedMessageSectionElementRef: ElementRef;

    responsive = false;
}

describe('IllustratedMessageSectionComponent', () => {
    let illustratedMessageSectionElementRef: ElementRef;
    let testComponent: TestIllustratedMessageSectionComponent;
    let fixture: ComponentFixture<TestIllustratedMessageSectionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestIllustratedMessageSectionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestIllustratedMessageSectionComponent);
        illustratedMessageSectionElementRef = fixture.componentInstance.illustratedMessageSectionElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should have assigned class when responsive is set to true', () => {
        testComponent.responsive = true;
        fixture.detectChanges();
        expect(
            illustratedMessageSectionElementRef.nativeElement.classList.contains(
                'fd-illustrated-message-responsive-container'
            )
        ).toBe(true);
    });
});
