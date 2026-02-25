import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverBodyFooterDirective } from './popover-body-directives/popover-body-footer.directive';
import { PopoverBodyHeaderDirective } from './popover-body-directives/popover-body-header.directive';
import { PopoverBodyComponent } from './popover-body.component';

@Component({
    template: `
        <fd-popover-body [minWidth]="minWidth" [maxWidth]="maxWidth" [minHeight]="minHeight" [maxHeight]="maxHeight">
            <div fd-popover-body-header>Header Content</div>
            <div class="body-content">Body Content</div>
            <div fd-popover-body-footer>Footer Content</div>
        </fd-popover-body>
    `,
    standalone: true,
    imports: [PopoverBodyComponent, PopoverBodyHeaderDirective, PopoverBodyFooterDirective]
})
class TestHostComponent {
    @ViewChild(PopoverBodyComponent) popoverBody: PopoverBodyComponent;

    minWidth = '200px';
    maxWidth = '400px';
    minHeight = '100px';
    maxHeight = '300px';
}

describe('PopoverBodyComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let popoverBody: PopoverBodyComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
        popoverBody = hostComponent.popoverBody;
    });

    it('should create', () => {
        expect(popoverBody).toBeTruthy();
    });

    describe('content projection', () => {
        it('should project header content', () => {
            const headerContent = fixture.debugElement.query(By.css('[fd-popover-body-header]'));
            expect(headerContent.nativeElement.textContent).toContain('Header Content');
        });

        it('should project body content', () => {
            const bodyContent = fixture.debugElement.query(By.css('.body-content'));
            expect(bodyContent.nativeElement.textContent).toContain('Body Content');
        });

        it('should project footer content', () => {
            const footerContent = fixture.debugElement.query(By.css('[fd-popover-body-footer]'));
            expect(footerContent.nativeElement.textContent).toContain('Footer Content');
        });
    });

    describe('dimension inputs', () => {
        it('should apply minWidth from input when internal signal is not set', () => {
            // Ensure the internal signal is not set
            popoverBody._popoverBodyMinWidth.set(undefined);
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.minWidth).toBe('200px');
        });

        it('should prefer internal signal over minWidth input when set', () => {
            popoverBody._popoverBodyMinWidth.set(300);
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.minWidth).toBe('300px');
        });

        it('should apply minHeight style from input', () => {
            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.minHeight).toBe('100px');
        });

        it('should apply maxHeight style from input', () => {
            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.maxHeight).toBe('300px');
        });

        it('should update height dimensions when inputs change', () => {
            hostComponent.minHeight = '150px';
            hostComponent.maxHeight = '350px';
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.minHeight).toBe('150px');
            expect(bodyDiv.nativeElement.style.maxHeight).toBe('350px');
        });

        it('should apply internal maxWidth signal in pixels', () => {
            popoverBody._maxWidth.set(500);
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.maxWidth).toBe('500px');
        });

        it('should apply internal width signal in pixels', () => {
            popoverBody._popoverBodyWidth.set(350);
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.style.width).toBe('350px');
        });
    });

    describe('escape key handling', () => {
        it('should emit close event when Escape is pressed and closeOnEscapeKey is enabled', () => {
            const closeSpy = jest.fn();
            popoverBody.onClose.subscribe(closeSpy);
            popoverBody._closeOnEscapeKey.set(true);

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            popoverBody._elementRef.nativeElement.dispatchEvent(escapeEvent);

            expect(closeSpy).toHaveBeenCalled();
        });

        it('should not emit close event when Escape is pressed but closeOnEscapeKey is disabled', () => {
            const closeSpy = jest.fn();
            popoverBody.onClose.subscribe(closeSpy);
            popoverBody._closeOnEscapeKey.set(false);

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            popoverBody._elementRef.nativeElement.dispatchEvent(escapeEvent);

            expect(closeSpy).not.toHaveBeenCalled();
        });

        it('should stop propagation when Escape closes the popover', () => {
            popoverBody._closeOnEscapeKey.set(true);

            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            const stopPropagationSpy = jest.spyOn(escapeEvent, 'stopPropagation');

            popoverBody._elementRef.nativeElement.dispatchEvent(escapeEvent);

            expect(stopPropagationSpy).toHaveBeenCalled();
        });
    });

    describe('arrow visibility', () => {
        it('should show arrow class when noArrow is false', () => {
            popoverBody._noArrow.set(false);
            popoverBody._arrowClasses.set('fd-popover__body--below');
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.classList.contains('fd-popover__body--no-arrow')).toBe(false);
            expect(bodyDiv.nativeElement.classList.contains('fd-popover__body--below')).toBe(true);
        });

        it('should hide arrow when noArrow is true', () => {
            popoverBody._noArrow.set(true);
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.classList.contains('fd-popover__body--no-arrow')).toBe(true);
        });
    });

    describe('additional body class', () => {
        it('should apply additional body class when set', () => {
            popoverBody._additionalBodyClass.set('custom-class');
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.classList.contains('custom-class')).toBe(true);
        });
    });

    describe('resizable', () => {
        it('should show resize handle when resizable is true', () => {
            popoverBody._resizable.set(true);
            fixture.detectChanges();

            const resizeHandle = fixture.debugElement.query(By.css('.fd-popover__resize-handle'));
            expect(resizeHandle).toBeTruthy();
        });

        it('should hide resize handle when resizable is false', () => {
            popoverBody._resizable.set(false);
            fixture.detectChanges();

            const resizeHandle = fixture.debugElement.query(By.css('.fd-popover__resize-handle'));
            expect(resizeHandle).toBeFalsy();
        });

        it('should add resizable class when resizable is true', () => {
            popoverBody._resizable.set(true);
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.classList.contains('fd-popover__body--resizable')).toBe(true);
        });
    });

    describe('scrollbar', () => {
        it('should show scrollbar wrapper when disableScrollbar is false', () => {
            popoverBody._disableScrollbar.set(false);
            fixture.detectChanges();

            const scrollbarWrapper = fixture.debugElement.query(By.css('.fd-popover__wrapper'));
            expect(scrollbarWrapper).toBeTruthy();
        });

        it('should not show scrollbar wrapper when disableScrollbar is true', () => {
            popoverBody._disableScrollbar.set(true);
            fixture.detectChanges();

            const scrollbarWrapper = fixture.debugElement.query(By.css('.fd-popover__wrapper'));
            expect(scrollbarWrapper).toBeFalsy();
        });
    });

    describe('accessibility', () => {
        it('should have dialog role by default', () => {
            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.getAttribute('role')).toBe('dialog');
        });

        it('should apply custom role when set', () => {
            popoverBody._bodyRole.set('menu');
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.getAttribute('role')).toBe('menu');
        });

        it('should apply body id when set', () => {
            popoverBody._bodyId.set('custom-popover-id');
            fixture.detectChanges();

            const bodyDiv = fixture.debugElement.query(By.css('.fd-popover__body'));
            expect(bodyDiv.nativeElement.getAttribute('id')).toBe('custom-popover-id');
        });
    });

    describe('text content', () => {
        it('should display text content when set', () => {
            popoverBody.text.set('Hello World');
            fixture.detectChanges();

            const bodyElement = fixture.debugElement.query(By.css('fd-popover-body'));
            expect(bodyElement.nativeElement.textContent).toContain('Hello World');
        });
    });
});
