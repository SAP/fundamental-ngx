import { signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';

import { MessageStripComponent } from './message-strip.component';

describe('MessageStripComponent', () => {
    let component: MessageStripComponent;
    let fixture: ComponentFixture<MessageStripComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MessageStripComponent],
            providers: [
                {
                    provide: FD_LANGUAGE_SIGNAL,
                    useValue: signal(FD_LANGUAGE_ENGLISH)
                }
            ]
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

    describe('dismiss button aria-label', () => {
        it('should set default translated aria-label on dismiss button when type is provided', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.componentRef.setInput('dismissible', true);
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button).toBeTruthy();
            const ariaLabel = button.getAttribute('aria-label');
            expect(ariaLabel).toBeTruthy();
            // Should contain translated text (default English)
            expect(ariaLabel).toContain('Warning');
        });

        it('should use custom dismissBtnTitle when provided', () => {
            fixture.componentRef.setInput('type', 'error');
            fixture.componentRef.setInput('dismissible', true);
            fixture.componentRef.setInput('dismissBtnTitle', 'Custom close button');
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button).toBeTruthy();
            expect(button.getAttribute('aria-label')).toBe('Custom close button');
        });

        it('should update aria-label when dismissBtnTitle changes', () => {
            fixture.componentRef.setInput('type', 'information');
            fixture.componentRef.setInput('dismissible', true);
            fixture.componentRef.setInput('dismissBtnTitle', 'First title');
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button.getAttribute('aria-label')).toBe('First title');

            // Update the title
            fixture.componentRef.setInput('dismissBtnTitle', 'Second title');
            fixture.detectChanges();

            expect(button.getAttribute('aria-label')).toBe('Second title');
        });

        it('should fall back to default when dismissBtnTitle is empty', () => {
            fixture.componentRef.setInput('type', 'success');
            fixture.componentRef.setInput('dismissible', true);
            fixture.componentRef.setInput('dismissBtnTitle', '');
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button).toBeTruthy();
            const ariaLabel = button.getAttribute('aria-label');
            expect(ariaLabel).toBeTruthy();
            // Should contain translated text (default English)
            expect(ariaLabel).toContain('Success');
        });

        it('should set title attribute with same value as aria-label', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.componentRef.setInput('dismissible', true);
            fixture.componentRef.setInput('dismissBtnTitle', 'Test tooltip');
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button.getAttribute('title')).toBe('Test tooltip');
            expect(button.getAttribute('aria-label')).toBe('Test tooltip');
        });
    });

    describe('dismissible property', () => {
        it('should show dismiss button when dismissible is true (default)', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button).toBeTruthy();
        });

        it('should hide dismiss button when dismissible is false', () => {
            fixture.componentRef.setInput('dismissible', false);
            fixture.detectChanges();

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            expect(button).toBeNull();
        });

        it('should add dismissible CSS class when dismissible is true', () => {
            fixture.componentRef.setInput('dismissible', true);
            fixture.detectChanges();

            expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--dismissible')).toBe(true);
        });

        it('should not add dismissible CSS class when dismissible is false', () => {
            fixture.componentRef.setInput('dismissible', false);
            fixture.detectChanges();

            expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--dismissible')).toBe(false);
        });
    });

    describe('onDismiss event', () => {
        it('should emit onDismiss event when dismiss button is clicked', () => {
            fixture.componentRef.setInput('dismissible', true);
            fixture.detectChanges();

            const dismissSpy = jest.fn();
            component.onDismiss.subscribe(dismissSpy);

            const button = component.elementRef.nativeElement.querySelector('.fd-message-strip__close');
            button.click();

            expect(dismissSpy).toHaveBeenCalledTimes(1);
        });

        it('should emit onDismiss event when dismiss() method is called programmatically', () => {
            const dismissSpy = jest.fn();
            component.onDismiss.subscribe(dismissSpy);

            component.dismiss();

            expect(dismissSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('indicationColor', () => {
        it('should apply indication color class when indicationColor is set', () => {
            fixture.componentRef.setInput('indicationColor', 1);
            fixture.detectChanges();

            expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--indication-color-1')).toBe(
                true
            );
        });

        it('should apply different indication color classes', () => {
            const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            colors.forEach((color) => {
                fixture.componentRef.setInput('indicationColor', color);
                fixture.detectChanges();

                expect(
                    component.elementRef.nativeElement.classList.contains(`fd-message-strip--indication-color-${color}`)
                ).toBe(true);
            });
        });

        it('should not apply indication color class when indicationColor is not set', () => {
            fixture.detectChanges();

            const classList = Array.from(component.elementRef.nativeElement.classList);
            const hasIndicationColorClass = classList.some((className: string) =>
                className.startsWith('fd-message-strip--indication-color-')
            );

            expect(hasIndicationColorClass).toBe(false);
        });
    });

    describe('message strip types', () => {
        it('should apply warning type class', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.detectChanges();

            expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--warning')).toBe(true);
        });

        it('should apply error type class', () => {
            fixture.componentRef.setInput('type', 'error');
            fixture.detectChanges();

            expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--error')).toBe(true);
        });

        it('should apply information type class', () => {
            fixture.componentRef.setInput('type', 'information');
            fixture.detectChanges();

            expect(component.elementRef.nativeElement.classList.contains('fd-message-strip--information')).toBe(true);
        });

        it('should not apply type class when type is not provided', () => {
            fixture.detectChanges();

            const classList = Array.from(component.elementRef.nativeElement.classList);
            const hasTypeClass = classList.some(
                (className: string) =>
                    className.includes('--warning') ||
                    className.includes('--error') ||
                    className.includes('--success') ||
                    className.includes('--information')
            );

            expect(hasTypeClass).toBe(false);
        });
    });

    describe('icon rendering', () => {
        it('should render icon for warning type', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.detectChanges();

            const icon = component.elementRef.nativeElement.querySelector('fd-icon');
            expect(icon).toBeTruthy();
            expect(icon.classList.contains('sap-icon--alert')).toBe(true);
        });

        it('should render icon for success type', () => {
            fixture.componentRef.setInput('type', 'success');
            fixture.detectChanges();

            const icon = component.elementRef.nativeElement.querySelector('fd-icon');
            expect(icon).toBeTruthy();
            expect(icon.classList.contains('sap-icon--sys-enter-2')).toBe(true);
        });

        it('should render icon for error type', () => {
            fixture.componentRef.setInput('type', 'error');
            fixture.detectChanges();

            const icon = component.elementRef.nativeElement.querySelector('fd-icon');
            expect(icon).toBeTruthy();
            expect(icon.classList.contains('sap-icon--error')).toBe(true);
        });

        it('should render icon for information type', () => {
            fixture.componentRef.setInput('type', 'information');
            fixture.detectChanges();

            const icon = component.elementRef.nativeElement.querySelector('fd-icon');
            expect(icon).toBeTruthy();
            expect(icon.classList.contains('sap-icon--information')).toBe(true);
        });

        it('should not render icon when noIcon is true', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.componentRef.setInput('noIcon', true);
            fixture.detectChanges();

            const iconContainer = component.elementRef.nativeElement.querySelector('.fd-message-strip__icon-container');
            expect(iconContainer).toBeNull();
        });

        it('should not render icon when type is not provided', () => {
            fixture.detectChanges();

            const iconContainer = component.elementRef.nativeElement.querySelector('.fd-message-strip__icon-container');
            expect(iconContainer).toBeNull();
        });
    });

    describe('screen reader accessibility', () => {
        it('should render hidden text for screen readers with warning type', () => {
            fixture.componentRef.setInput('type', 'warning');
            fixture.detectChanges();

            const hiddenText = component.elementRef.nativeElement.querySelector('.fd-message-strip__sr-only');
            expect(hiddenText).toBeTruthy();
            expect(hiddenText.textContent).toContain('Warning');
        });

        it('should include "closable" text in hidden text when dismissible', () => {
            fixture.componentRef.setInput('type', 'error');
            fixture.componentRef.setInput('dismissible', true);
            fixture.detectChanges();

            const hiddenText = component.elementRef.nativeElement.querySelector('.fd-message-strip__sr-only');
            expect(hiddenText).toBeTruthy();
            // The hidden text should announce that it's closable
            expect(hiddenText.textContent.length).toBeGreaterThan(5); // More than just "Error"
        });

        it('should set correct id on hidden text element', () => {
            fixture.componentRef.setInput('type', 'information');
            fixture.componentRef.setInput('id', 'custom-test-id');
            fixture.detectChanges();

            const hiddenText = component.elementRef.nativeElement.querySelector('.fd-message-strip__sr-only');
            expect(hiddenText).toBeTruthy();
            expect(hiddenText.getAttribute('id')).toBe('custom-test-id-hidden-text');
        });
    });

    describe('content projection', () => {
        it('should have a text container element for content projection', () => {
            fixture.detectChanges();

            const textContainer = component.elementRef.nativeElement.querySelector('.fd-message-strip__text');
            expect(textContainer).toBeTruthy();
            expect(textContainer.tagName).toBe('P');
        });
    });
});
