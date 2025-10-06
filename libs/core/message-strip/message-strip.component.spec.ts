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
        fixture.componentRef.setInput('noIcon', 'true');
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--no-icon')).toBe(true);
    });

    it('should apply a type', () => {
        fixture.componentRef.setInput('type', 'success');
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
        fixture.componentRef.setInput('ariaLabel', 'Test label');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('aria-label')).toBe('Test label');
    });

    it('should set width style if provided', () => {
        fixture.componentRef.setInput('width', '200px');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.style.width).toBe('200px');
    });

    it('should set min-width style if provided', () => {
        fixture.componentRef.setInput('minWidth', '500px');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.style.minWidth).toBe('500px');
    });

    it('should set margin-bottom style if provided', () => {
        fixture.componentRef.setInput('marginBottom', '10px');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.style.marginBottom).toBe('10px');
    });

    it('should set id attribute if provided', () => {
        fixture.componentRef.setInput('id', 'test-id');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('id')).toBe('test-id');
    });

    it('should set role="note" on the host element', () => {
        expect(component.elementRef.nativeElement.getAttribute('role')).toBe('note');
    });

    it('should set aria-labelledby attribute on the host element', () => {
        expect(component.elementRef.nativeElement.getAttribute('aria-labelledby')).toBe(
            `${component.id()}-hidden-text ${component.id()}-content-text`
        );
        expect(component.elementRef.nativeElement.hasAttribute('aria-labelledby')).toBe(true);
        expect(component.elementRef.nativeElement.getAttribute('aria-labelledby')).toBe(
            `${component.id()}-hidden-text ${component.id()}-content-text`
        );
    });

    it('should set custom aria-labelledby attribute on the host element if ariaLabelledBy input provided', () => {
        fixture.componentRef.setInput('ariaLabelledBy', 'custom-id');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.hasAttribute('aria-labelledby')).toBe(true);
        expect(component.elementRef.nativeElement.getAttribute('aria-labelledby')).toBe(component.ariaLabelledBy());
    });

    it('should set an id attribute on the message strip text container', () => {
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.querySelector('.fd-message-strip__text').getAttribute('id')).toBe(
            `${component.id()}-content-text`
        );
    });
});
