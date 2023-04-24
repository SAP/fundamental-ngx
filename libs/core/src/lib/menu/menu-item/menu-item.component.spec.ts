import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MenuInteractiveDirective } from '../directives/menu-interactive.directive';
import { MenuComponent } from '../menu.component';
import { MenuModule } from '../menu.module';
import { MenuItemComponent } from './menu-item.component';

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
            declarations: [TestMenuItemComponent],
            imports: [MenuModule]
        }).compileComponents();
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
        const setSubmenuSpy = jest.spyOn(menuInteractive, 'setSubmenu');
        const setDisabledSpy = jest.spyOn(menuInteractive, 'setDisabled');

        menuItem.ngAfterContentInit();

        expect(setDisabledSpy).toHaveBeenCalledWith(menuItem.disabled);
        expect(setSubmenuSpy).toHaveBeenCalledWith(false, menuItem.itemId);
    });

    it('should set item as active on click', fakeAsync(() => {
        const setActiveSpy = jest.spyOn(menuItem.menuService!, 'setActive');
        const setSelectedSpy = jest.spyOn(menuItem, 'setSelected');

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

        const setActiveSpy = jest.spyOn(menuItem.menuService!, 'setActive');

        menuInteractive.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        tick();

        expect(setActiveSpy).not.toHaveBeenCalled();
        expect(menuInteractive.selected).toBe(false);
        expect(menuItem['_hoverSubscriptions'].closed).toBe(false);
    }));

    it('should have no hover listener in mobile mode', fakeAsync(() => {
        menuItem.menuService!.setMenuMode(true);

        tick();

        expect(menuItem['_hoverSubscriptions'].closed).toBe(true);
    }));

    it('should set disabled state', fakeAsync(() => {
        const setDisabledSpy = jest.spyOn(menuInteractive, 'setDisabled');

        fixture.componentInstance.disabled = true;
        fixture.detectChanges();

        tick();

        expect(setDisabledSpy).toHaveBeenCalledWith(true);
        expect(menuInteractive.disabled).toBe(true);
    }));
});

@Component({
    template: `
        <button [fdMenuTrigger]="menu">Menu With sub-menu</button>
        <fd-menu #menu>
            <li fd-menu-item>
                <div fd-menu-interactive>Option 1</div>
            </li>
            <li fd-menu-item #menuItemWithNestedMenu [submenu]="submenu">
                <div fd-menu-interactive>Option 2 with submenu</div>
            </li>
            <li fd-menu-item>
                <div fd-menu-interactive>Option 3</div>
            </li>
        </fd-menu>

        <fd-submenu #submenu>
            <li fd-menu-item #menuNestedItem>
                <div fd-menu-interactive>Option 2.1</div>
            </li>
        </fd-submenu>
    `
})
class TesNestedMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChild('menuItemWithNestedMenu') menuItemWithNestedMenu: MenuItemComponent;
    @ViewChild('menuNestedItem') menuNestedItem: MenuItemComponent;
    @ViewChild(MenuInteractiveDirective) menuInteractive: MenuInteractiveDirective;
}

describe('MenuItemComponent nested', () => {
    let fixture: ComponentFixture<TesNestedMenuItemComponent>;
    let menu: MenuComponent;
    let menuItemWithNestedMenu: MenuItemComponent;
    let nestedMenuItem: MenuItemComponent;
    let menuInteractiveWithNested: MenuInteractiveDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TesNestedMenuItemComponent],
            imports: [MenuModule]
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(TesNestedMenuItemComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuItemWithNestedMenu = fixture.componentInstance.menuItemWithNestedMenu;
        nestedMenuItem = fixture.componentInstance.menuNestedItem;
        menuInteractiveWithNested = menuItemWithNestedMenu.menuInteractive;
    }));

    it('should create', () => {
        expect(menu).toBeTruthy();
        expect(menuItemWithNestedMenu).toBeTruthy();
        expect(nestedMenuItem).toBeTruthy();
        expect(menuInteractiveWithNested).toBeTruthy();
    });

    it('should have menu service', () => {
        expect(menuItemWithNestedMenu.menuService).toBeTruthy();
    });

    it('should have submenu', () => {
        expect(menuItemWithNestedMenu.submenu).toBeTruthy();
        expect(menuItemWithNestedMenu.submenuVisible).toBe(false);
    });

    it('should open/close submenu', fakeAsync(() => {
        const setSelectedSpy = jest.spyOn(menuInteractiveWithNested, 'setSelected');

        menu.open();
        fixture.detectChanges();

        tick();

        menuItemWithNestedMenu.setSelected(true);

        expect(setSelectedSpy).toHaveBeenCalledWith(true);
        expect(menuItemWithNestedMenu.submenuVisible).toBe(true);

        menuItemWithNestedMenu.setSelected(false);

        expect(setSelectedSpy).toHaveBeenCalledWith(false);
        expect(menuItemWithNestedMenu.submenuVisible).toBe(false);
    }));

    it('should open submenu on menu item hover', fakeAsync(() => {
        const openSubmenuSpy = jest.spyOn(menuItemWithNestedMenu, 'setSelected');

        menu.open();
        fixture.detectChanges();

        tick();

        menuInteractiveWithNested.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));

        tick();

        expect(openSubmenuSpy).toHaveBeenCalled();
        expect(menuItemWithNestedMenu.submenuVisible).toBe(true);
    }));

    it('should close sibling opened submenu when mouse goes on another menu item', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();
        tick();

        // Hover on the second option
        menuInteractiveWithNested.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
        tick();
        // Since hover on the second option submenu is shown
        expect(menuItemWithNestedMenu.submenuVisible).toBe(true);

        // Hover moves on sibling menu item
        menu._menuItems.first.menuInteractive.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
        tick();

        // the second option submenu gets closed
        expect(menuItemWithNestedMenu.submenuVisible).toBe(false);
    }));

    it('should configure menu interactive', () => {
        const setSubmenuSpy = jest.spyOn(menuInteractiveWithNested, 'setSubmenu');
        const setDisabledSpy = jest.spyOn(menuInteractiveWithNested, 'setDisabled');

        menuItemWithNestedMenu.ngAfterContentInit();

        expect(setDisabledSpy).toHaveBeenCalledWith(menuItemWithNestedMenu.disabled);
        expect(setSubmenuSpy).toHaveBeenCalledWith(true, menuItemWithNestedMenu.itemId);
    });
});
