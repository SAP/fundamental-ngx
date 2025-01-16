import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MicroProcessFlowIntermediaryItemDirective } from './micro-process-flow-intermediary-item.directive'; // Ensure correct path

@Component({
    template: `<div #directiveElement fd-micro-process-flow-intermediary-item></div>`,
    standalone: true,
    imports: [MicroProcessFlowIntermediaryItemDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref: ElementRef;
}

describe('MicroProcessFlowIntermediaryItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class fd-micro-process-flow__intermediary-item to the directive element', () => {
        expect(component.ref.nativeElement.classList.contains('fd-micro-process-flow__intermediary-item')).toBe(true);
    });
});
