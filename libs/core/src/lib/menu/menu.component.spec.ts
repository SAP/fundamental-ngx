import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';
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
    `,
    standalone: true,
    imports: [MenuModule]
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
    let fixture: ComponentFixture<TestMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuService = menu['_menuService'];
    });

    it('should properly initialize menu', () => {
        expect(menu).toBeTruthy();
        expect(menuService.menuMap).toBeTruthy();
    });

    it('should open/close popover', fakeAsync(() => {
        const menuElement = (): Element => document.querySelector('[fd-menu-interactive]') as Element;
        const openEmitterSpy = jest.spyOn(menu.isOpenChange, 'emit');

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
        const mobileViewSpy = jest.spyOn(menu as any, '_setupMobileMode');
        menu.mobile = true;
        (<any>menu)._setupView();

        fixture.detectChanges();

        expect(mobileViewSpy).toHaveBeenCalled();
    }));

    it('should select desktop view', () => {
        const keyboardSupportSpy = jest.spyOn(menu as any, '_setupPopoverService');
        (<any>menu)._setupView();

        menu.open();

        fixture.detectChanges();

        expect(keyboardSupportSpy).toHaveBeenCalled();
    });

    xit('should focus first element on open', async () => {
        // does not work in Jest
        const firstElementFocusIn = jest.fn();
        const firstElementFocusOut = jest.fn();
        menu._menuItems.first.elementRef.nativeElement.addEventListener('focusin', firstElementFocusIn);
        menu._menuItems.first.elementRef.nativeElement.addEventListener('focusout', firstElementFocusOut);
        menu.open();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(firstElementFocusIn).toHaveBeenCalled();
        expect(firstElementFocusOut).not.toHaveBeenCalled();
    });

    it('should open after clicking on trigger on mobiles', () => {
        menu.mobile = true;
        (<any>menu)._listenOnTriggerRefClicks();

        expect(menu.isOpen).toBe(false);

        fixture.detectChanges();
        menu.trigger.nativeElement.dispatchEvent(new MouseEvent('click'));

        fixture.detectChanges();

        expect(menu.isOpen).toBe(true);
    });

    it('should destroy all references', () => {
        const destroyEventsSpy = jest.spyOn(menu as any, '_destroyEventListeners');
        const destroyMobileSpy = jest.spyOn(menu as any, '_destroyMobileComponent');
        const menuServiceDestroySpy = jest.spyOn(menu['_menuService'] as any, 'onDestroy');

        menu.ngOnDestroy();

        fixture.detectChanges();

        expect(destroyEventsSpy).toHaveBeenCalled();
        expect(destroyMobileSpy).toHaveBeenCalled();
        expect(menuServiceDestroySpy).toHaveBeenCalled();
    });
});
