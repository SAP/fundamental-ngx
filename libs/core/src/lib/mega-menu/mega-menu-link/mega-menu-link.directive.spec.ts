import { MegaMenuLinkDirective } from './mega-menu-link.directive';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <a fd-mega-menu-link #directiveElement>Fd-badge test</a>
    `
})

export class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('MegaMenuLinkDirective', () => {

    let component: TestComponent,
        fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuLinkDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        directive = debugElement.query(By.directive(MegaMenuLinkDirective));
        directiveInstance = directive.injector.get(MegaMenuLinkDirective);
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should add class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-mega-menu__link');
    });

    it('should add tabindex', () => {
        expect(component.ref.nativeElement.getAttribute('tabindex')).toBe('0');
    });
});
