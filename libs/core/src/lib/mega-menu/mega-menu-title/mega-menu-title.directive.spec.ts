import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenuTitleDirective } from './mega-menu-title.directive';

@Component({
    template: `
        <h3 #directiveElement fd-mega-menu-title>Fd test</h3>
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
            declarations: [MegaMenuTitleDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        directive = debugElement.query(By.directive(MegaMenuTitleDirective));
        directiveInstance = directive.injector.get(MegaMenuTitleDirective);
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should add class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-mega-menu__title');
    });
});
