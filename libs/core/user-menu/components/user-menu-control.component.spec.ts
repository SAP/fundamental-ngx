import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMenuControlComponent } from './user-menu-control.component';

@Component({
    template: `<fd-user-menu-control #elRef>User Menu Control Test</fd-user-menu-control>`,
    standalone: true,
    imports: [UserMenuControlComponent]
})
class TestHostComponent {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;

    @ViewChild(UserMenuControlComponent)
    controlComponent: UserMenuControlComponent;
}

describe('UserMenuControlComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let controlElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        controlElement = component.elRef.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('keyboard navigation', () => {
        it('should emit clicked event on Enter key', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            jest.spyOn(event, 'preventDefault');
            jest.spyOn(event, 'stopPropagation');

            controlElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(clickedSpy).toHaveBeenCalled();
        });

        it('should emit clicked event on Space key', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            const event = new KeyboardEvent('keydown', { key: ' ' });
            jest.spyOn(event, 'preventDefault');
            jest.spyOn(event, 'stopPropagation');

            controlElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(clickedSpy).toHaveBeenCalled();
        });

        it('should not emit clicked event on other keys', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            const event = new KeyboardEvent('keydown', { key: 'Tab' });
            controlElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(clickedSpy).not.toHaveBeenCalled();
        });

        it('should stop propagation to prevent unintended bubbling', () => {
            const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');

            controlElement.dispatchEvent(event);

            expect(stopPropagationSpy).toHaveBeenCalled();
        });
    });

    describe('mouse interaction', () => {
        it('should emit clicked event on click', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            controlElement.click();
            fixture.detectChanges();

            expect(clickedSpy).toHaveBeenCalled();
        });
    });

    describe('focus', () => {
        it('should be focusable with tabindex 0', () => {
            expect(controlElement.getAttribute('tabindex')).toBe('0');
        });

        it('should focus element when focus() is called', () => {
            component.controlComponent.focus();

            expect(document.activeElement).toBe(controlElement);
        });
    });
});
