import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuModule } from './menu.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuService } from './services/menu.service';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu #menu>
            <li fd-menu-item tabindex="0">
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
        
        <button #trigger [fdMenuTrigger]="menu"></button>
    `
})
export class TestMenuComponent {

    @ViewChild(MenuComponent)
    menu: MenuComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    @ViewChildren('trigger', { read: ElementRef })
    trigger: ElementRef;
}

describe('MenuComponent', () => {
    let menu: MenuComponent;
    let menuService: MenuService;
    let menuItems: QueryList<MenuItemComponent>;
    let fixture: ComponentFixture<TestMenuComponent>;

    beforeEach(waitForAsync(() => {
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

    it('should select mobile view', fakeAsync(() => {
        const mobileViewSpy = spyOn<any>(menu, '_setupMobileMode');
        menu.setMobileMode = true;
        (<any>menu)._setupView();

        fixture.detectChanges();

        expect(mobileViewSpy).toHaveBeenCalled();
    }));

    it('should select desktop view', () => {
        const keyboardSupportSpy = spyOn<any>(menu, '_manageKeyboardSupport');
        (<any>menu)._setupView();

        menu.open();

        fixture.detectChanges();

        expect(keyboardSupportSpy).toHaveBeenCalled();
    });

    it('should focus first element on open', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();
        tick();

        expect(menu.menuItems.first.elementRef.nativeElement).toBe(document.activeElement);
    }));

    it('should open after clicking on trigger on mobiles', () => {
        menu.setMobileMode = true;
        (<any>menu)._listenOnTriggerRefClicks();

        expect(menu.isOpen).toBeFalse();

        fixture.detectChanges();
        menu.trigger.nativeElement.dispatchEvent(new MouseEvent('click'));

        fixture.detectChanges();

        expect(menu.isOpen).toBeTrue();
    });

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
