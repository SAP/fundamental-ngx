import { Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { MenuComponent } from '../menu.component';
import { MenuTriggerDirective } from './menu-trigger.directive';

@Component({
    template: '<div [fdMenuTrigger]="null"></div>',
    imports: [MenuTriggerDirective],
    standalone: true
})
class TestComponent {
    @ViewChild(MenuTriggerDirective) menuTrigger: MenuTriggerDirective;
}

describe('MenuTriggerDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: MenuTriggerDirective;
    let menu: Partial<MenuComponent>;
    let isOpenChangeSubject: Subject<boolean>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        const isOpenSignal = signal(false);
        isOpenChangeSubject = new Subject<boolean>();

        // Mock the output() which internally uses OutputEmitterRef
        // The directive subscribes via outputToObservable or similar pattern
        menu = {
            id: () => 'menu-id',
            isOpen: isOpenSignal,
            isOpenChange: {
                subscribe: (callback: (value: boolean) => void) => isOpenChangeSubject.subscribe(callback)
            },
            set trigger(value) {}
        } as any;

        fixture.detectChanges();
        directive = fixture.componentInstance.menuTrigger;
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should set menu trigger', () => {
        const setTriggerSpy = jest.spyOn(menu, 'trigger', 'set');
        const listenersSpy = jest.spyOn(directive as any, '_subscribeToMenu');
        const attributesSpy = jest.spyOn(directive as any, '_setAriaAttributes');

        directive.menu = undefined;

        expect(setTriggerSpy).not.toHaveBeenCalled();
        expect(listenersSpy).not.toHaveBeenCalled();
        expect(attributesSpy).toHaveBeenCalled();

        directive.menu = menu as MenuComponent;

        expect(setTriggerSpy).toHaveBeenCalled();
        expect(listenersSpy).toHaveBeenCalled();
        expect(attributesSpy).toHaveBeenCalledTimes(2);
    });

    it('should set proper aria attributes', fakeAsync(() => {
        directive.menu = menu as MenuComponent;

        tick();
        fixture.detectChanges();

        expect(directive.ariaHasPopup).toBe(true);
        expect(directive.ariaExpanded).toBeFalsy();
        expect(directive.ariaControls).toBeFalsy();

        (menu.isOpen as any).set(true);
        isOpenChangeSubject.next(true);
        fixture.detectChanges();
        flushMicrotasks();
        tick();

        expect(directive.ariaExpanded).toBe(true);
        expect(directive.ariaControls).toEqual(menu.id!());
    }));
});
