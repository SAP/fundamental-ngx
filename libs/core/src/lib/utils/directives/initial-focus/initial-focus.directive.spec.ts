import { InitialFocusDirective } from './initial-focus.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, InitialFocusDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should focus element', fakeAsync(() => {
        fixture.detectChanges();
        tick(10);
        expect(document.activeElement).toBe(component.elementToFocus.nativeElement);
    }));

    it('should focus nested element', fakeAsync(() => {
        component.rootElementTabIndex = -1;
        fixture.detectChanges();
        tick(10);
        expect(document.activeElement).toBe(component.nestedElementToFocus.nativeElement);
    }));
});
