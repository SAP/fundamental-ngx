import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessageStripComponent } from './message-strip.component';

@Component({
    template: ` <fd-message-strip> A dismissible normal message strip.</fd-message-strip> `
})
class TestMessageStripComponent {
    @ViewChild(MessageStripComponent, { static: true })
    messageStripComponent: MessageStripComponent;
}

describe('MessageStripComponent', () => {
    let component: MessageStripComponent;
    let fixture: ComponentFixture<TestMessageStripComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MessageStripComponent],
            declarations: [TestMessageStripComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMessageStripComponent);
        component = fixture.componentInstance.messageStripComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should Add no-icon modifier class', () => {
        component.noIcon = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--no-icon')).toBe(true);
    });

    it('should apply a type', () => {
        component.type = 'success';
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--success')).toBe(true);
    });

    it('should dismiss', () => {
        component.dismiss();
        expect(component.elementRef.nativeElement.classList.contains('fd-has-display-block')).toBe(false);
        expect(component.elementRef.nativeElement.classList.contains('fd-has-display-none')).toBe(true);
    });
});
