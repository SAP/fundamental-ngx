import { InitialFocusDirective } from './initial-focus.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    template: `
        <button fd-initial-focus [attr.tabindex]="rootElementTabIndex" #elementToFocus>
            <span>Non Focusable</span>
            <span tabindex="0" #nestedElementToFocus>Focusable</span>
            <button>Focusable</button>
        </button>
    `
})
class TestComponent {
    @ViewChild('elementToFocus') elementToFocus: ElementRef;
    @ViewChild('nestedElementToFocus') nestedElementToFocus: ElementRef;

    rootElementTabIndex = 0;
}

describe('InitialFocusDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, InitialFocusDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should focus element', () => {
        fixture.detectChanges();
        expect(document.activeElement).toBe(component.elementToFocus.nativeElement);
    });

    it('should focus nested element', () => {
        component.rootElementTabIndex = -1;
        fixture.detectChanges();
        expect(document.activeElement).toBe(component.nestedElementToFocus.nativeElement);
    });
});
