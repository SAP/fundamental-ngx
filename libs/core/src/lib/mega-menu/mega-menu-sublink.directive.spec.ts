import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenuSublinkDirective } from './mega-menu-sublink.directive';

@Component({
    template: `
        <a #directiveElement fd-mega-menu-sublink>Fd test</a>
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
            declarations: [MegaMenuSublinkDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        directive = debugElement.query(By.directive(MegaMenuSublinkDirective));
        directiveInstance = directive.injector.get(MegaMenuSublinkDirective);
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should add class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-mega-menu__sublink');
    });
});
