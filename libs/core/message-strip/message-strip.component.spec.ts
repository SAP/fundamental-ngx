import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessageStripComponent } from './message-strip.component';

@Component({
    template: ` <fd-message-strip> A dismissible normal message strip.</fd-message-strip> `,
    standalone: true,
    imports: [MessageStripComponent]
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
            imports: [TestMessageStripComponent]
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

    it('should set aria-label attribute if provided', () => {
        component.ariaLabel = 'Test label';
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.getAttribute('aria-label')).toBe('Test label');
    });

    it('should set width style if provided', () => {
        component.width = '200px';
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.style.width).toBe('200px');
    });

    it('should set min-width style if provided', () => {
        component.minWidth = '500px';
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.style.minWidth).toBe('500px');
    });

    it('should set margin-bottom style if provided', () => {
        component.marginBottom = '10px';
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.style.marginBottom).toBe('10px');
    });

    it('should set id attribute if provided', () => {
        component.id = 'test-id';
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.getAttribute('id')).toBe('test-id');
    });

    it('should set role="note" on the host element', () => {
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.getAttribute('role')).toBe('note');
    });

    it('should set aria-labelledby attribute on the host element', () => {
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.hasAttribute('aria-labelledby')).toBe(true);
        expect(hostElement.getAttribute('aria-labelledby')).toBe(
            `${component.id}-hidden-text ${component.id}-content-text`
        );
    });

    it('should set custom aria-labelledby attribute on the host element if ariaLabelledBy input provided', () => {
        component.ariaLabelledBy = 'custom-id';
        fixture.detectChanges();
        const hostElement = fixture.nativeElement.querySelector('fd-message-strip');
        expect(hostElement.hasAttribute('aria-labelledby')).toBe(true);
        expect(hostElement.getAttribute('aria-labelledby')).toBe(component.ariaLabelledBy);
    });

    it('should set an id attribute on the message strip text container', () => {
        fixture.detectChanges();
        const contentText = component.elementRef.nativeElement.querySelector('.fd-message-strip__text');
        expect(contentText.getAttribute('id')).toBe(`${component.id}-content-text`);
    });
});
