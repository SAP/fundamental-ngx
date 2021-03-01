import { MenuTriggerDirective } from './menu-trigger.directive';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MenuComponent } from '../menu.component';
import { Component, EventEmitter, ViewChild } from '@angular/core';

@Component({ template: '<div [fdMenuTrigger]="null"></div>'})
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
        const setTriggerSpy = spyOnProperty(menu, 'trigger', 'set');
        const listenersSpy = spyOn<any>(directive, '_listenOnExpanded');
        const attributesSpy = spyOn<any>(directive, '_setAriaAttributes');

        directive.menu = null;

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

        expect(directive.ariaHasPopup).toBeTrue();
        expect(directive.ariaExpanded).toBeFalse();
        expect(directive.ariaControls).toEqual(menu.id);

        menu.isOpenChange.emit(true);

        tick();

        expect(directive.ariaExpanded).toBeTrue();
    }));
});
