import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuInteractiveComponent } from '../menu-interactive.component';
import { MenuItemComponent, SubmenuComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu.component';
import { MenuService } from './menu.service';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu>
            <li fd-menu-item [submenu]="submenu">
                <div fd-menu-interactive></div>
            </li>
            <li fd-menu-item [disabled]="disabled">
                <div fd-menu-interactive></div>
            </li>
            <li fd-menu-item>
                <div fd-menu-interactive></div>
            </li>
        </fd-menu>

        <fd-submenu #submenu>
            <li fd-menu-item #nestedItem>
                <div fd-menu-interactive></div>
            </li>
        </fd-submenu>
    `,
    standalone: true,
    imports: [MenuComponent, MenuItemComponent, MenuInteractiveComponent, SubmenuComponent]
})
export class TestMenuComponent {
    @ViewChild(MenuComponent)
    menu: MenuComponent;

    @ViewChild('nestedItem')
    nestedMenuItem: MenuItemComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    disabled = false;
}

describe('MenuService', () => {
    let menu: MenuComponent;
    let menuService: MenuService;
    let nestedMenuItem: MenuItemComponent;
    let menuItems: QueryList<MenuItemComponent>;
    let fixture: ComponentFixture<TestMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuItems = fixture.componentInstance.menuItems;
        nestedMenuItem = fixture.componentInstance.nestedMenuItem;
        menuService = menu['_menuService'];
    });

    it('should create', () => {
        expect(menu).toBeTruthy();
        expect(menuItems).toBeTruthy();
        expect(menuService).toBeTruthy();
    });

    it('should properly build menu', () => {
        menuItems.forEach((menuItem) => expect(menuService.menuMap.get(menuItem)).toBeTruthy());
        expect(menuService.menuMap.get(menuItems.first)?.children.length).toEqual(1);
        expect(menuService.menuMap.get(null)?.children.length).toEqual(3);
    });

    it('should set menu item as focused', () => {
        const focusSpy = jest.spyOn(menuItems.last, 'focus');
        menuService.setFocused(menuItems.last);

        expect(focusSpy).toHaveBeenCalled();
        expect(menuService.focusedNode?.item).toBe(menuItems.last);
    });

    it('should set menu item active and update active path', () => {
        const selectedSpy = jest.spyOn(menuItems.last, 'setSelected');
        const activePathSpy = jest.spyOn(menuService as any, '_emitActivePath');
        const addToActivePathSpy = jest.spyOn(menuService as any, '_addToActivePath');

        menuService.setActive(true, menuItems.last);

        expect(selectedSpy).toHaveBeenCalled();
        expect(activePathSpy).toHaveBeenCalled();
        expect(addToActivePathSpy).toHaveBeenCalled();
        expect(menuService.activeNodePath.length).toBe(1);
        expect(menuService.activeNodePath[0].item).toBe(menuItems.last);
    });

    it('should remove and close menu item from active path', () => {
        menuService.setActive(true, menuItems.last);

        const closeSpy = jest.spyOn(menuItems.last, 'setSelected');
        const activePathSpy = jest.spyOn(menuService as any, '_emitActivePath');
        const removeFromActivePathSpy = jest.spyOn(menuService as any, '_removeFromActivePath');

        menuService.setActive(false, menuItems.last);

        expect(activePathSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalledWith(false);
        expect(removeFromActivePathSpy).toHaveBeenCalled();
        expect(menuService.activeNodePath.length).toBe(0);
    });

    it('should handle removing unknown node from active path', () => {
        const closeSpy = jest.spyOn(menuItems.last, 'setSelected');

        menuService.setActive(false, menuItems.last);

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should not activate disabled element', () => {
        const addToActivePathSpy = jest.spyOn(menuService as any, '_addToActivePath');
        menuItems.last.disabled = true;

        menuService.setActive(true, menuItems.last);

        expect(addToActivePathSpy).not.toHaveBeenCalled();
        expect(menuService.activeNodePath.length).toBe(0);
    });

    it('should reset menu state', () => {
        const clearPathSpy = jest.spyOn(menuService as any, '_clearActivePath');
        const activePathSpy = jest.spyOn(menuService as any, '_emitActivePath');

        menuService.setActive(true, menuItems.last);
        menuService.resetMenuState();

        expect(clearPathSpy).toHaveBeenCalled();
        expect(activePathSpy).toHaveBeenCalled();
        expect(menuService.focusedNode).toBeFalsy();
        expect(menuService.activeNodePath.length).toEqual(0);
    });

    it('should return node siblings', () => {
        const siblings = menuService['_nodeSiblings'](menuService.menuMap.get(menuItems.first)!);
        expect(siblings?.length).toEqual(3);
    });

    it('should open submenu on arrow right', fakeAsync(() => {
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');
        const activateSpy = jest.spyOn(menuItems.first, 'setSelected');
        menuService.focusedNode = menuService.menuMap.get(menuItems.first);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        tick();

        expect(setFocusedSpy).toHaveBeenCalled();
        expect(activateSpy).toHaveBeenCalledWith(true);
        expect(menuService.activeNodePath[menuService.activeNodePath.length - 1].item).toBe(menuItems.first);
    }));

    it('should open submenu on arrow right', fakeAsync(() => {
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');
        const activateSpy = jest.spyOn(menuItems.first, 'setSelected');
        menuService.focusedNode = menuService.menuMap.get(menuItems.first);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        tick();

        expect(setFocusedSpy).toHaveBeenCalled();
        expect(activateSpy).toHaveBeenCalledWith(true);
        expect(menuService.activeNodePath[menuService.activeNodePath.length - 1].item).toBe(menuItems.first);
    }));

    it('should open submenu on arrow left', () => {
        const setActiveSpy = jest.spyOn(menuService, 'setActive');
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');

        menuService.setActive(true, menuItems.first);
        menuService.focusedNode = menuService.menuMap.get(nestedMenuItem);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

        expect(setActiveSpy).toHaveBeenCalledWith(false, menuItems.first);
        expect(setFocusedSpy).toHaveBeenCalledWith(menuItems.first);
    });

    it('should focus next menu item on arrow down', () => {
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');

        menuService.focusedNode = menuService.menuMap.get(menuItems.first);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(setFocusedSpy).toHaveBeenCalledWith(menuItems.toArray()[1]);
    });

    it('should focus next menu item on arrow up', () => {
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');

        menuService.focusedNode = menuService.menuMap.get(menuItems.toArray()[1]);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(setFocusedSpy).toHaveBeenCalledWith(menuItems.first);
    });

    it('should open submenu on space/enter', () => {
        const clickSpy = jest.spyOn(menuItems.first, 'click');

        menuService.focusedNode = menuService.menuMap.get(menuItems.first);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'Enter' }));
        menuService['_handleKey'](new KeyboardEvent('keydown', { key: ' ' }));

        expect(clickSpy).toHaveBeenCalledTimes(2);
    });

    it('should close menu on Escape', () => {
        const closeSpy = jest.spyOn(menu, 'close');

        menuService.focusedNode = menuService.menuMap.get(menuItems.first);

        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should focus next available element on arrow up', () => {
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        const menuItemsArray = menuItems.toArray();
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');

        menuService.focusedNode = menuService.menuMap.get(menuItemsArray[2]);
        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(setFocusedSpy).toHaveBeenCalledWith(menuItemsArray[0]);
    });

    it('should focus next available element on arrow down', () => {
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        const menuItemsArray = menuItems.toArray();
        const setFocusedSpy = jest.spyOn(menuService, 'setFocused');

        menuService.focusedNode = menuService.menuMap.get(menuItemsArray[0]);
        menuService['_handleKey'](new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(setFocusedSpy).toHaveBeenCalledWith(menuItemsArray[2]);
    });
});
