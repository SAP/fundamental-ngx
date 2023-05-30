import { InitialFocusDirective } from './initial-focus.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

@Component({
    template: `
        <button fd-initial-focus [enabled]="enabled" [attr.tabindex]="rootElementTabIndex" #elementToFocus>
            <span>Non Focusable</span>
            <span tabindex="0" #nestedElementToFocus>Focusable</span>
            <button>Focusable</button>
        </button>
    `
})
class TestComponent {
    enabled = false;
    @ViewChild('elementToFocus') elementToFocus: ElementRef;
    @ViewChild('nestedElementToFocus') nestedElementToFocus: ElementRef;
    @ViewChild(InitialFocusDirective) initialFocusDir: InitialFocusDirective;

    rootElementTabIndex = 0;
}

describe('InitialFocusDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [InitialFocusDirective]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        // Need for A11y cdk module to correctly define tabbable/focusable element.
        Object.defineProperty(global.window.HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 10 });

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should focus element', fakeAsync(() => {
        const spy = jest.spyOn(component.elementToFocus.nativeElement, 'focus');
        component.enabled = true;
        fixture.detectChanges();
        tick(10);
        expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should focus nested element', fakeAsync(() => {
        const spy = jest.spyOn(component.nestedElementToFocus.nativeElement, 'focus');
        component.rootElementTabIndex = -1;
        fixture.detectChanges();
        component.enabled = true;
        fixture.detectChanges();
        tick(10);
        expect(spy).toHaveBeenCalledTimes(1);
    }));
});
