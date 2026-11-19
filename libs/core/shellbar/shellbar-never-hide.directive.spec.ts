import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarNeverHideDirective } from './shellbar-never-hide.directive';

@Component({
    template: `<div fdShellbarNeverHide></div>`,
    imports: [ShellbarNeverHideDirective]
})
class BasicTestComponent {}

@Component({
    template: `
        <div style="display: flex; width: 100px; overflow: hidden;">
            <button id="regular-item" style="min-width: 80px;">Regular Item</button>
            <button id="never-hide-item" fdShellbarNeverHide style="min-width: 80px;">Never Hide</button>
        </div>
    `,
    imports: [ShellbarNeverHideDirective]
})
class OverflowTestComponent {}

describe('ShellbarNeverHideDirective', () => {
    describe('basic functionality', () => {
        let component: BasicTestComponent;
        let fixture: ComponentFixture<BasicTestComponent>;
        let element: HTMLElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [BasicTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(BasicTestComponent);
            component = fixture.componentInstance;
            element = fixture.nativeElement.querySelector('[fdShellbarNeverHide]');
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should add flex-shrink: 0 style', () => {
            expect(element.style.flexShrink).toBe('0');
        });

        it('should have fd-shellbar-never-hide class', () => {
            expect(element.classList.contains('fd-shellbar-never-hide')).toBe(true);
        });

        it('should have fdShellbarNeverHide attribute', () => {
            expect(element.hasAttribute('fdShellbarNeverHide')).toBe(true);
        });
    });

    describe('overflow behavior', () => {
        let component: OverflowTestComponent;
        let fixture: ComponentFixture<OverflowTestComponent>;
        let regularItem: HTMLElement;
        let neverHideItem: HTMLElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [OverflowTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(OverflowTestComponent);
            component = fixture.componentInstance;
            regularItem = fixture.nativeElement.querySelector('#regular-item');
            neverHideItem = fixture.nativeElement.querySelector('#never-hide-item');
            fixture.detectChanges();
        });

        it('should keep never-hide item visible when regular items are hidden', () => {
            // Simulate hiding regular items (like shellbar does on overflow)
            regularItem.style.display = 'none';

            // Never-hide item should remain visible
            expect(neverHideItem.style.display).not.toBe('none');
            expect(window.getComputedStyle(neverHideItem).display).not.toBe('none');
        });

        it('should have flex-shrink: 0 to prevent shrinking', () => {
            expect(neverHideItem.style.flexShrink).toBe('0');
            // Regular item should be able to shrink (no explicit flex-shrink)
            expect(regularItem.style.flexShrink).toBe('');
        });

        it('should be identifiable by fd-shellbar-never-hide class', () => {
            expect(neverHideItem.classList.contains('fd-shellbar-never-hide')).toBe(true);
            expect(regularItem.classList.contains('fd-shellbar-never-hide')).toBe(false);
        });
    });
});
