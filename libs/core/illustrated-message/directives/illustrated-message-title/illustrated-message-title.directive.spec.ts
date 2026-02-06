import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IllustratedMessageTitleDirective } from './illustrated-message-title.directive';

@Component({
    template: ` <h3 #directiveElement fd-illustrated-message-title>Illustrated Message Title</h3> `,
    standalone: true,
    imports: [IllustratedMessageTitleDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('IllustratedMessageTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
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
        expect(component.ref.nativeElement.className).toBe('fd-illustrated-message__title');
    });
});
