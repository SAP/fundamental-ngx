import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { InlineHelpDirective } from './inline-help.directive';
import { InlineHelpModule } from './inline-help.module';

@Component({
    template: `
        @if (visible) {
            <div #directiveElement fd-inline-help="123"></div>
        }
    `,
    imports: [InlineHelpModule]
})
class InlineHelpDefaultTestComponent {
    @ViewChild('directiveElement', { static: false, read: ElementRef })
    ref: ElementRef<HTMLDivElement>;

    visible = true;
}

@Component({
    template: `
        <div
            #directiveElement
            fd-inline-help="Test content"
            [noArrow]="noArrow"
            [closeOnEscapeKey]="closeOnEscapeKey"
            [closeOnNavigation]="closeOnNavigation"
            [restoreFocusOnClose]="restoreFocusOnClose"
            [fixedPosition]="fixedPosition"
            [maxWidth]="maxWidth"
            [appendTo]="appendTo"
            [scrollStrategy]="scrollStrategy"
        ></div>
    `,
    imports: [InlineHelpModule]
})
class InlineHelpInputsTestComponent {
    @ViewChild('directiveElement', { static: false, read: ElementRef })
    ref: ElementRef<HTMLDivElement>;

    noArrow = false;
    closeOnEscapeKey = false;
    closeOnNavigation = true;
    restoreFocusOnClose = true;
    fixedPosition = false;
    maxWidth: number | null = null;
    appendTo: Element | null = null;
    scrollStrategy: ScrollStrategy | null = null;
}

describe('InlineHelpDirective', () => {
    let component: InlineHelpDefaultTestComponent;
    let fixture: ComponentFixture<InlineHelpDefaultTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpDefaultTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineHelpDefaultTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the inline help on hover', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should hide the inline help if host element is destroyed', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.visible = false;
        fixture.detectChanges();
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should show the inline help on focus', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('focusin'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.ref.nativeElement.dispatchEvent(new Event('focusout'));
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should have correct trigger class applied', () => {
        expect(component.ref.nativeElement.classList.contains('fd-inline-help__trigger')).toBe(true);
    });

    it('should apply inline help content class to popover body', fakeAsync(() => {
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        const popoverBody = document.body.querySelector('.fd-popover__body');
        expect(popoverBody?.classList.contains('fd-inline-help__content')).toBe(true);
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(50);
    }));
});

describe('InlineHelpDirective popover inputs', () => {
    let fixture: ComponentFixture<InlineHelpInputsTestComponent>;
    let component: InlineHelpInputsTestComponent;
    let popoverService: PopoverService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpInputsTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineHelpInputsTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const directiveDebugEl = fixture.debugElement.query(By.directive(InlineHelpDirective));
        popoverService = directiveDebugEl.injector.get(PopoverService);
    });

    it('should pass noArrow to popover service', () => {
        expect(popoverService.noArrow()).toBe(false);
        component.noArrow = true;
        fixture.detectChanges();
        expect(popoverService.noArrow()).toBe(true);
    });

    it('should pass closeOnEscapeKey to popover service', () => {
        expect(popoverService.closeOnEscapeKey()).toBe(false);
        component.closeOnEscapeKey = true;
        fixture.detectChanges();
        expect(popoverService.closeOnEscapeKey()).toBe(true);
    });

    it('should pass closeOnNavigation to popover service', () => {
        expect(popoverService.closeOnNavigation()).toBe(true);
        component.closeOnNavigation = false;
        fixture.detectChanges();
        expect(popoverService.closeOnNavigation()).toBe(false);
    });

    it('should pass restoreFocusOnClose to popover service', () => {
        expect(popoverService.restoreFocusOnClose()).toBe(true);
        component.restoreFocusOnClose = false;
        fixture.detectChanges();
        expect(popoverService.restoreFocusOnClose()).toBe(false);
    });

    it('should pass fixedPosition to popover service', () => {
        expect(popoverService.fixedPosition()).toBe(false);
        component.fixedPosition = true;
        fixture.detectChanges();
        expect(popoverService.fixedPosition()).toBe(true);
    });

    it('should pass maxWidth to popover service', () => {
        expect(popoverService.maxWidth()).toBeNull();
        component.maxWidth = 300;
        fixture.detectChanges();
        expect(popoverService.maxWidth()).toBe(300);
    });

    it('should pass appendTo to popover service', () => {
        expect(popoverService.appendTo()).toBeNull();
        const container = document.createElement('div');
        document.body.appendChild(container);
        component.appendTo = container;
        fixture.detectChanges();
        expect(popoverService.appendTo()).toBe(container);
        document.body.removeChild(container);
    });

    it('should pass scrollStrategy to popover service (regression #14210)', () => {
        const overlay = TestBed.inject(Overlay);
        expect(popoverService.scrollStrategy()).toBeNull();
        const closeStrategy = overlay.scrollStrategies.close();
        component.scrollStrategy = closeStrategy;
        fixture.detectChanges();
        expect(popoverService.scrollStrategy()).toBe(closeStrategy);
    });

    it('should close on escape key when closeOnEscapeKey is true (focus on trigger)', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        component.closeOnEscapeKey = true;
        fixture.detectChanges();

        // Open via focusin on the trigger
        component.ref.nativeElement.dispatchEvent(new Event('focusin'));
        fixture.detectChanges();
        expect(document.body.querySelector(selector)).toBeTruthy();

        // Press Escape on the trigger element
        component.ref.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should close on escape key when closeOnEscapeKey is true (hover, no focus on trigger)', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        component.closeOnEscapeKey = true;
        fixture.detectChanges();

        // Open via mouseenter (hover) — keyboard focus is NOT on the trigger
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        expect(document.body.querySelector(selector)).toBeTruthy();

        // Press Escape on the document body (simulates real user pressing Escape
        // when focus is elsewhere, not on the trigger element)
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should not close on escape key when closeOnEscapeKey is false', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        component.closeOnEscapeKey = false;
        fixture.detectChanges();

        // Open via focusin on the trigger
        component.ref.nativeElement.dispatchEvent(new Event('focusin'));
        expect(document.body.querySelector(selector)).toBeTruthy();

        // Press Escape on the trigger element — should NOT close
        component.ref.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        tick(50);
        expect(document.body.querySelector(selector)).toBeTruthy();

        // Clean up
        component.ref.nativeElement.dispatchEvent(new Event('focusout'));
        tick(50);
    }));

    it('should not close on document escape key when closeOnEscapeKey is false (hover)', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        component.closeOnEscapeKey = false;
        fixture.detectChanges();

        // Open via mouseenter (hover)
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();

        // Press Escape on document — should NOT close
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        tick(50);
        expect(document.body.querySelector(selector)).toBeTruthy();

        // Clean up
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(50);
    }));
});
