import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenuListDirective } from './mega-menu-list.directive';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';

@Component({
    template: `
        <li #directiveElement fd-mega-menu-list>Fd test</li>
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
            declarations: [MegaMenuListDirective, TestComponent],
            providers: [MenuKeyboardService]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        directive = debugElement.query(By.directive(MegaMenuListDirective));
        directiveInstance = directive.injector.get(MegaMenuListDirective);
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should add class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-mega-menu__list');
    });
});
