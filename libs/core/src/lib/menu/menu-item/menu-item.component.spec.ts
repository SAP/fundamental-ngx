import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { MenuItemComponent, SubmenuComponent } from './menu-item.component';
import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { MenuInteractiveDirective } from '../directives/menu-interactive.directive'
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../../popover/popover.module';

@Component({
    template: `
        <fd-menu>
            <li fd-menu-item [disabled]="disabled">
                <div fd-menu-interactive></div>
            </li>
        </fd-menu>
    `
})
class TestMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChild(MenuItemComponent) menuItem: MenuItemComponent;
    @ViewChild(MenuInteractiveDirective) menuInteractive: MenuInteractiveDirective;

    disabled = false;
}

describe('MenuItemComponent', () => {
    let fixture: ComponentFixture<TestMenuItemComponent>;
    let menu: MenuComponent;
    let menuItem: MenuItemComponent;
    let menuInteractive: MenuInteractiveDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestMenuItemComponent, MenuComponent, MenuItemComponent, MenuInteractiveDirective],
            imports: [CommonModule, PopoverModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuItemComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuItem = fixture.componentInstance.menuItem;
        menuInteractive = fixture.componentInstance.menuInteractive;
    });

    it('should create', () => {
        expect(menu).toBeTruthy();
        expect(menuItem).toBeTruthy();
        expect(menuInteractive).toBeTruthy();
    });

    it('should have menu service', () => {
        expect(menuItem.menuService).toBeTruthy();
    });

    it('should configure menu interactive', () => {
        const setSubmenuSpy = spyOn(menuInteractive, 'setSubmenu');
        const setDisabledSpy = spyOn(menuInteractive, 'setDisabled');

        menuItem.ngAfterContentInit();

        expect(setDisabledSpy).toHaveBeenCalledWith(menuItem.disabled);
        expect(setSubmenuSpy).toHaveBeenCalledWith(false, menuItem.itemId);
    });

    it('should set item as active on click', fakeAsync(() => {
        const setActiveSpy = spyOn(menuItem.menuService, 'setActive').and.callThrough();
        const setSelectedSpy = spyOn(menuItem, 'setSelected');

        menu.open();
        fixture.detectChanges();

        tick();

        menuInteractive.elementRef.nativeElement.click();

        expect(setSelectedSpy).toHaveBeenCalledWith(true);
        expect(setActiveSpy).toHaveBeenCalledWith(true, menuItem);
    }));

    it('should not select on hover when no submenu', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();

        tick();

        const setActiveSpy = spyOn(menuItem.menuService, 'setActive');

        menuInteractive.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        tick();

        expect(setActiveSpy).not.toHaveBeenCalled();
        expect(menuInteractive.selected).toBeFalse();
        expect(menuItem['_hoverSubscriptions'].closed).toBeFalse();
    }));

    it('should have no hover listener in mobile mode', fakeAsync(() => {
        menuItem.menuService.setMenuMode(true);

        tick();

        expect(menuItem['_hoverSubscriptions'].closed).toBeTrue();
    }));

    it('should set disabled state', fakeAsync(() => {
        const setDisabledSpy = spyOn(menuInteractive, 'setDisabled').and.callThrough();

        fixture.componentInstance.disabled = true;
        fixture.detectChanges();

        tick();

        expect(setDisabledSpy).toHaveBeenCalledWith(true);
        expect(menuInteractive.disabled).toBeTrue();
    }));

    it('should set hover', fakeAsync(() => {
        const setFocusListenerSpy = spyOn(menuItem.menuService, 'setFocused').and.callThrough();
        const setFocusSpy = spyOn(menuItem, 'focus').and.callThrough();

        menu.open();
        fixture.detectChanges();

        tick();

        menuInteractive.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        tick();

        expect(setFocusListenerSpy).toHaveBeenCalled();
        expect(setFocusSpy).toHaveBeenCalled();
    }));
});

@Component({
    template: `
        <fd-menu>
            <li fd-menu-item #menuItem [submenu]="submenu">
                <div fd-menu-interactive></div>
            </li>
        </fd-menu>

        <fd-submenu #submenu>
            <li fd-menu-item #menuNestedItem>
                <div fd-menu-interactive></div>
            </li>
        </fd-submenu>
    `
})
class TesNestedMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChild('menuItem') menuItem: MenuItemComponent;
    @ViewChild('menuNestedItem') menuNestedItem: MenuItemComponent;
    @ViewChild(MenuInteractiveDirective) menuInteractive: MenuInteractiveDirective;
}

describe('MenuItemComponent nested', () => {
    let fixture: ComponentFixture<TesNestedMenuItemComponent>;
    let menu: MenuComponent;
    let menuItem: MenuItemComponent;
    let menuNestedItem: MenuItemComponent;
    let menuInteractive: MenuInteractiveDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TesNestedMenuItemComponent,
                MenuInteractiveDirective,
                MenuItemComponent,
                SubmenuComponent,
                MenuComponent
            ],
            imports: [CommonModule, PopoverModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TesNestedMenuItemComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuItem = fixture.componentInstance.menuItem;
        menuNestedItem = fixture.componentInstance.menuNestedItem;
        menuInteractive = fixture.componentInstance.menuInteractive;
    });

    it('should create', () => {
        expect(menu).toBeTruthy();
        expect(menuItem).toBeTruthy();
        expect(menuNestedItem).toBeTruthy();
        expect(menuInteractive).toBeTruthy();
    });

    it('should have menu service', () => {
        expect(menuItem.menuService).toBeTruthy();
    });

    it('should have submenu', () => {
        expect(menuItem.submenu).toBeTruthy();
        expect(menuItem.submenuVisible).toBeFalse();
    });


    it('should open/close submenu', fakeAsync(() => {
        const setSelectedSpy = spyOn(menuInteractive, 'setSelected');

        menu.open();
        fixture.detectChanges();

        tick();

        menuItem.setSelected(true);

        expect(setSelectedSpy).toHaveBeenCalledWith(true);
        expect(menuItem.submenuVisible).toBeTrue();

        menuItem.setSelected(false);

        expect(setSelectedSpy).toHaveBeenCalledWith(false);
        expect(menuItem.submenuVisible).toBeFalse();
    }));

    it('should open submenu on menu item hover', fakeAsync(() => {
        const openSubmenuSpy = spyOn(menuItem, 'setSelected').and.callThrough();

        menu.open();
        fixture.detectChanges();

        tick();

        menuInteractive.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        tick();

        expect(openSubmenuSpy).toHaveBeenCalled();
        expect(menuItem.submenuVisible).toBeTrue();
    }));

    it('should configure menu interactive', () => {
        const setSubmenuSpy = spyOn(menuInteractive, 'setSubmenu');
        const setDisabledSpy = spyOn(menuInteractive, 'setDisabled');

        menuItem.ngAfterContentInit();

        expect(setDisabledSpy).toHaveBeenCalledWith(menuItem.disabled);
        expect(setSubmenuSpy).toHaveBeenCalledWith(true, menuItem.itemId);
    });
});
