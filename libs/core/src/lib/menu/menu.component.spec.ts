import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {
    Component,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { MenuModule } from './menu.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuService } from './services/menu.service';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu>
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Option 1</span>
                </a>
            </li>
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Option 2</span>
                </a>
            </li>
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Option 3</span>
                </a>
            </li>
        </fd-menu>
    `
})
export class TestMenuComponent {

    @ViewChild(MenuComponent)
    menu: MenuComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

}

describe('MenuComponent', () => {
    let menu: MenuComponent;
    let menuService: MenuService;
    let menuItems: QueryList<MenuItemComponent>;
    let fixture: ComponentFixture<TestMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MenuModule],
            declarations: [TestMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuItems = fixture.componentInstance.menuItems;
        menuService = menu['_menuService'];
    });

    it('should properly initialize menu', () => {
        expect(menu).toBeTruthy();
        expect(menuService.menuMap).toBeTruthy();
    });

    it('should open/close popover', fakeAsync(() => {
        const menuElement = () => document.querySelector('[fd-menu-interactive]');
        const openEmitterSpy = spyOn(menu.isOpenChange, 'emit');

        menu.open();
        fixture.detectChanges();

        tick();

        expect(menuElement()).toBeTruthy();
        expect(openEmitterSpy).toHaveBeenCalledWith(true);

        menu.close();
        fixture.detectChanges();

        tick();

        expect(menuElement()).toBeFalsy();
        expect(openEmitterSpy).toHaveBeenCalledWith(false);
    }));

    it('should focus first element on open', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();

        tick();

        expect(menuService.focusedNode.item).toBe(menuItems.first);
        expect(menuService.focusedNode.item.menuInteractive.elementRef.nativeElement).toBe(document.activeElement);
    }));

    it('should select proper view depending on menu mode', fakeAsync(() => {
        const desktopViewSpy = spyOn<any>(menu, '_loadView');
        const mobileViewSpy = spyOn<any>(menu, '_setupMobileMode');
        const destroyMobileSpy = spyOn<any>(menu, '_destroyMobileComponent');
        const keyboardSupportSpy = spyOn<any>(menu, '_manageKeyboardSupport');

        menu.setMobileMode = true;
        menu.open();
        fixture.detectChanges();

        tick();

        expect(mobileViewSpy).toHaveBeenCalled();
        expect(keyboardSupportSpy).toHaveBeenCalledWith(false);

        menu.setMobileMode = false;
        fixture.detectChanges();

        tick();

        menu.open();
        fixture.detectChanges();

        tick();

        expect(desktopViewSpy).toHaveBeenCalled();
        expect(destroyMobileSpy).toHaveBeenCalled();
        expect(keyboardSupportSpy).toHaveBeenCalledWith(true);
    }));

    it('should close on Esc key', fakeAsync(() => {
        const closeSpy = spyOn(menu, 'close');
        menu.closeOnEscapeKey = true;

        menu.open();
        fixture.detectChanges();

        tick();

        menu.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
    }));

    it('should subscribe to triggers', fakeAsync(() => {
        menu.triggers = ['click', 'mouseover', 'mouseenter'];
        menu.trigger = menu.elementRef;

        fixture.detectChanges();
        tick();

        expect(menu['_eventRef'].length).toBe(menu.triggers.length);
    }));

    it('should subscribe to triggers', fakeAsync(() => {
        menu.triggers = ['click', 'mouseover', 'mouseenter'];
        menu.trigger = menu.elementRef;

        fixture.detectChanges();
        tick();

        expect(menu['_eventRef'].length).toBe(menu.triggers.length);
    }));

    it('should destroy all references', () => {
        const destroyEventsSpy = spyOn<any>(menu, '_destroyEventListeners');
        const destroyMobileSpy = spyOn<any>(menu, '_destroyMobileComponent');
        const menuServiceDestroySpy = spyOn<any>(menu['_menuService'], 'onDestroy');

        menu.ngOnDestroy();

        fixture.detectChanges();

        expect(destroyEventsSpy).toHaveBeenCalled();
        expect(destroyMobileSpy).toHaveBeenCalled();
        expect(menuServiceDestroySpy).toHaveBeenCalled();
    });
});
