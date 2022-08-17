import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MicroProcessFlowModule } from './micro-process-flow.module';

@Component({
    template: `<div #directiveElement fd-micro-process-flow-intermediary-item></div>`
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('MicroProcessFlowIntermediaryItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [MicroProcessFlowModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-micro-process-flow__intermediary-item');
    });
});
