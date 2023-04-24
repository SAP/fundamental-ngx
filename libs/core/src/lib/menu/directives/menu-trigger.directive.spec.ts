import { MenuTriggerDirective } from './menu-trigger.directive';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MenuComponent } from '../menu.component';
import { Component, EventEmitter, ViewChild } from '@angular/core';

@Component({ template: '<div [fdMenuTrigger]="null"></div>' })
class TestComponent {
    @ViewChild(MenuTriggerDirective) menuTrigger: MenuTriggerDirective;
}

describe('MenuTriggerDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: MenuTriggerDirective;
    let menu: Partial<MenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, MenuTriggerDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        menu = {
            id: 'menu-id',
            isOpen: false,
            isOpenChange: new EventEmitter<boolean>(),
            set trigger(value) {}
        };

        fixture.detectChanges();
        directive = fixture.componentInstance.menuTrigger;
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should set menu trigger', () => {
        const setTriggerSpy = jest.spyOn(Object.getOwnPropertyDescriptor(menu, 'trigger')!, 'set');
        const listenersSpy = jest.spyOn<any, any>(directive, '_subscribeToMenu');
        const attributesSpy = jest.spyOn<any, any>(directive, '_setAriaAttributes');

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

        expect(directive.ariaHasPopup).toBe(true);
        expect(directive.ariaExpanded).toBeFalsy();
        expect(directive.ariaControls).toBeFalsy();

        menu.isOpen = true;
        menu.isOpenChange!.emit(true);

        tick();

        expect(directive.ariaExpanded).toBe(true);
        expect(directive.ariaControls).toEqual(menu.id);
    }));
});
