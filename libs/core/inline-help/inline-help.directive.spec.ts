import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InlineHelpModule } from './inline-help.module';

@Component({
    template: `
        @if (visible) {
            <div #directiveElement fd-inline-help="123"></div>
        }
    `,
    standalone: true,
    imports: [InlineHelpModule]
})
class TestComponent {
    @ViewChild('directiveElement', { static: false, read: ElementRef })
    ref: ElementRef<HTMLDivElement>;

    visible = true;
}
describe('InlineHelpDirective', () => {
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

    it('should show the inline help on hover', () => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
        expect(document.body.querySelector(selector)).toBeFalsy();
    });

    it('should hide the inline help if host element is destroyed', () => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.visible = false;
        fixture.detectChanges();
        expect(document.body.querySelector(selector)).toBeFalsy();
    });

    it('should show the inline help on focus', () => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('focusin'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.ref.nativeElement.dispatchEvent(new Event('focusout'));
        expect(document.body.querySelector(selector)).toBeFalsy();
    });

    it('should have correct trigger class applied', () => {
        expect(component.ref.nativeElement.classList.contains('fd-inline-help__trigger')).toBe(true);
    });

    it('should apply inline help content class to popover body', () => {
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        const popoverBody = document.body.querySelector('.fd-popover__body');
        expect(popoverBody?.classList.contains('fd-inline-help__content')).toBe(true);
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
    });
});
