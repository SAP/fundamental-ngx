import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarNeverHideDirective } from './shellbar-never-hide.directive';

@Component({
    template: `<div fdShellbarNeverHide></div>`,
    imports: [ShellbarNeverHideDirective]
})
class TestComponent {}

describe('ShellbarNeverHideDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
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

    it('should have fdShellbarNeverHide attribute', () => {
        expect(element.hasAttribute('fdShellbarNeverHide')).toBe(true);
    });
});
