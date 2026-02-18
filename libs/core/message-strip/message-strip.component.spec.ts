import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessageStripComponent } from './message-strip.component';

describe('MessageStripComponent', () => {
    let component: MessageStripComponent;
    let fixture: ComponentFixture<MessageStripComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MessageStripComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageStripComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should Add no-icon modifier class', () => {
        fixture.componentRef.setInput('noIcon', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--no-icon')).toBe(true);
    });

    it('should apply a type', () => {
        fixture.componentRef.setInput('type', 'success');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--success')).toBe(true);
    });

    it('should dismiss', () => {
        component.dismiss();
        expect(component.elementRef.nativeElement.classList.contains('fd-has-display-block')).toBe(false);
        expect(component.elementRef.nativeElement.classList.contains('fd-has-display-none')).toBe(true);
    });

    it('should set aria-label attribute if provided', () => {
        fixture.componentRef.setInput('ariaLabel', 'Test label');
        fixture.detectChanges();
        const hostElement = fixture.nativeElement;
        expect(hostElement.getAttribute('aria-label')).toBe('Test label');
    });

    it('should set width style if provided', () => {
        fixture.componentRef.setInput('width', '200px');
        fixture.detectChanges();
        const hostElement = fixture.nativeElement;
        expect(hostElement.style.width).toBe('200px');
    });

    it('should set min-width style if provided', () => {
        fixture.componentRef.setInput('minWidth', '500px');
        fixture.detectChanges();
        const hostElement = fixture.nativeElement;
        expect(hostElement.style.minWidth).toBe('500px');
    });

    it('should set margin-bottom style if provided', () => {
        fixture.componentRef.setInput('marginBottom', '10px');
        fixture.detectChanges();
        const hostElement = fixture.nativeElement;
        expect(hostElement.style.marginBottom).toBe('10px');
    });

    it('should set id attribute if provided', () => {
        fixture.componentRef.setInput('id', 'test-id');
        fixture.detectChanges();
        const hostElement = fixture.nativeElement;
        expect(hostElement.getAttribute('id')).toBe('test-id');
    });

    it('should set role="note" on the host element', () => {
        const hostElement = fixture.nativeElement;
        expect(hostElement.getAttribute('role')).toBe('note');
    });

    it('should set aria-labelledby attribute on the host element', () => {
        const hostElement = fixture.nativeElement;
        expect(hostElement.hasAttribute('aria-labelledby')).toBe(true);
        expect(hostElement.getAttribute('aria-labelledby')).toBe(
            `${component.id()}-hidden-text ${component.id()}-content-text`
        );
    });

    it('should set custom aria-labelledby attribute on the host element if ariaLabelledBy input provided', () => {
        fixture.componentRef.setInput('ariaLabelledBy', 'custom-id');
        fixture.detectChanges();
        const hostElement = fixture.nativeElement;
        expect(hostElement.hasAttribute('aria-labelledby')).toBe(true);
        expect(hostElement.getAttribute('aria-labelledby')).toBe('custom-id');
    });

    it('should set an id attribute on the message strip text container', () => {
        fixture.detectChanges();
        const contentText = component.elementRef.nativeElement.querySelector('.fd-message-strip__text');
        expect(contentText.getAttribute('id')).toBe(`${component.id()}-content-text`);
    });
});
