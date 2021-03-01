import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IllustratedMessageModule } from '../../illustrated-message.module';

@Component({
    template: `
      <h3 #directiveElement fd-illustrated-message-title>Illustrated Message Title</h3>
      `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('IllustratedMessageTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [IllustratedMessageModule]
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
