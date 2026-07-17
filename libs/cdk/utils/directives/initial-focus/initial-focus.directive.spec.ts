import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InitialFocusDirective } from './initial-focus.directive';

@Component({
    standalone: true,
    imports: [InitialFocusDirective],
    template: `
        <button fdkInitialFocus [enabled]="enabled()" [attr.tabindex]="rootElementTabIndex" #elementToFocus>
            <span>Non Focusable</span>
            <span tabindex="0" #nestedElementToFocus>Focusable</span>
            <button>Focusable</button>
        </button>
    `
})
class TestComponent {
    @ViewChild('elementToFocus') elementToFocus: ElementRef;
    @ViewChild('nestedElementToFocus') nestedElementToFocus: ElementRef;
    @ViewChild(InitialFocusDirective) initialFocusDir: InitialFocusDirective;

    readonly enabled = input(false);
    rootElementTabIndex = 0;
}

describe('InitialFocusDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent, InitialFocusDirective]
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

    it('should focus element', async () => {
        const spy = jest.spyOn(component.elementToFocus.nativeElement, 'focus');
        fixture.componentRef.setInput('enabled', true);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should focus nested element', async () => {
        const spy = jest.spyOn(component.nestedElementToFocus.nativeElement, 'focus');
        component.rootElementTabIndex = -1;
        fixture.detectChanges();
        fixture.componentRef.setInput('enabled', true);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
