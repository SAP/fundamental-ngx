import { Component, ElementRef, signal, viewChild, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n/en';
import { UserMenuControlComponent } from './user-menu-control.component';

@Component({
    template: `<fd-user-menu-control role="button" #elRef
        ><fd-avatar label="Lisa Miller" ariaLabel="Lisa Miller"
    /></fd-user-menu-control>`,
    standalone: true,
    imports: [UserMenuControlComponent, AvatarComponent]
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
        const languageSignal = signal(FD_LANGUAGE_ENGLISH);
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: languageSignal }]
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

            controlElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
            expect(clickedSpy).toHaveBeenCalledTimes(1);
        });

        it('should emit clicked event on Space key', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            const event = new KeyboardEvent('keydown', { key: ' ' });
            jest.spyOn(event, 'preventDefault');

            controlElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(event.preventDefault).toHaveBeenCalled();
            expect(clickedSpy).toHaveBeenCalledTimes(1);
        });

        it('should not emit clicked event on other keys', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            const event = new KeyboardEvent('keydown', { key: 'Tab' });
            controlElement.dispatchEvent(event);
            fixture.detectChanges();

            expect(clickedSpy).not.toHaveBeenCalled();
        });

        it('should allow event to bubble for popover handling', () => {
            const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');

            controlElement.dispatchEvent(event);

            expect(stopPropagationSpy).not.toHaveBeenCalled();
        });
    });

    describe('mouse interaction', () => {
        it('should emit clicked event on click', () => {
            const clickedSpy = jest.fn();
            component.controlComponent.clicked.subscribe(clickedSpy);

            controlElement.click();
            fixture.detectChanges();

            expect(clickedSpy).toHaveBeenCalledTimes(1);
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

    describe('accessibility', () => {
        it('preserves an application-owned named button with one tab stop and a noninteractive avatar', () => {
            expect(controlElement.getAttribute('role')).toBe('button');
            expect(controlElement.getAttribute('aria-label')).toBe('User Menu');
            expect(controlElement.tabIndex).toBe(0);
            expect(controlElement.querySelectorAll('button, [role="button"], [tabindex="0"]').length).toBe(0);
            expect(controlElement.getAttribute('aria-expanded')).toBe('false');
        });
        it('should have aria-haspopup="dialog"', () => {
            expect(controlElement.getAttribute('aria-haspopup')).toBe('dialog');
        });

        it('should have aria-expanded="false" by default', () => {
            expect(controlElement.getAttribute('aria-expanded')).toBe('false');
        });

        it('should update aria-expanded when isExpanded changes', () => {
            component.controlComponent.isExpanded.set(true);
            fixture.detectChanges();
            expect(controlElement.getAttribute('aria-expanded')).toBe('true');

            component.controlComponent.isExpanded.set(false);
            fixture.detectChanges();
            expect(controlElement.getAttribute('aria-expanded')).toBe('false');
        });

        it('should have aria-label set to translated value', () => {
            const ariaLabel = controlElement.getAttribute('aria-label');
            expect(ariaLabel).toBe('User Menu');
        });
    });
});

@Component({
    template: `<fd-user-menu-control><button type="button">Open user menu</button></fd-user-menu-control>`,
    imports: [UserMenuControlComponent]
})
class NativeButtonHostComponent {
    readonly controlComponent = viewChild.required(UserMenuControlComponent);
}

describe('UserMenuControlComponent projected native button', () => {
    let fixture: ComponentFixture<NativeButtonHostComponent>;
    let button: HTMLButtonElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({ imports: [NativeButtonHostComponent] }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NativeButtonHostComponent);
        fixture.detectChanges();
        button = fixture.nativeElement.querySelector('button');
    });

    it('leaves the native button as the sole button without an enclosing button role', () => {
        expect(fixture.nativeElement.querySelectorAll('button, [role="button"]').length).toBe(1);
        expect(button.parentElement?.closest('[role="button"]')).toBeNull();
    });

    it.each(['pointer', 'Enter', 'Space'])('preserves %s activation through the projected native button', (method) => {
        const clicked = jest.fn();
        fixture.componentInstance.controlComponent().clicked.subscribe(clicked);
        if (method === 'pointer') {
            button.click();
        } else {
            const key = method === 'Space' ? ' ' : method;
            button.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        }
        expect(clicked).toHaveBeenCalledTimes(1);
    });
});
