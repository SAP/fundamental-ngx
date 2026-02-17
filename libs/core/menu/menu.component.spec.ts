import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent, SubmenuComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';
import { MenuService } from './services/menu.service';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu #menu [mobile]="mobileMode" [disabled]="isDisabled" [disableScrollbar]="scrollbarDisabled">
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

    mobileMode = false;
    isDisabled = false;
    scrollbarDisabled = false;
}

@Component({
    selector: 'fd-menu-submenu-test',
    template: `
        <fd-menu #menu [mobile]="mobileMode">
            <li fd-menu-item [submenu]="fruitsSubmenu">
                <div fd-menu-interactive>
                    <span fd-menu-title>Fruits</span>
                </div>
                <fd-submenu #fruitsSubmenu>
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Pineapple</span>
                        </a>
                    </li>
                    <li fd-menu-item>
                        <a href="#" fd-menu-interactive>
                            <span fd-menu-title>Banana</span>
                        </a>
                    </li>
                </fd-submenu>
            </li>
            <li fd-menu-item>
                <a href="#" fd-menu-interactive>
                    <span fd-menu-title>Meat</span>
                </a>
            </li>
        </fd-menu>

        <button #trigger [fdMenuTrigger]="menu"></button>
    `,
    standalone: true,
    imports: [MenuModule]
})
export class TestMenuSubmenuComponent {
    @ViewChild(MenuComponent)
    menu: MenuComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    @ViewChild(SubmenuComponent)
    submenu: SubmenuComponent;

    @ViewChildren('trigger', { read: ElementRef })
    trigger: ElementRef;

    mobileMode = false;
}

describe('MenuComponent', () => {
    let menu: MenuComponent;
    let menuService: MenuService;
    let fixture: ComponentFixture<TestMenuComponent>;
    let testComponent: TestMenuComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        menu = testComponent.menu;
        menuService = menu['_menuService'];
    });

    it('should properly initialize menu', () => {
        expect(menu).toBeTruthy();
        expect(menuService.menuMap).toBeTruthy();
    });

    it('should open/close popover', fakeAsync(() => {
        const menuElement = (): Element => document.querySelector('[fd-menu-interactive]') as Element;

        // Explicitly setup view to ensure popover service is initialized
        (<any>menu)._setupView();
        fixture.detectChanges();

        menu.open();
        fixture.detectChanges();

        tick();

        expect(menuElement()).toBeTruthy();
        expect(menu.isOpen()).toBe(true);

        menu.close();
        fixture.detectChanges();

        tick();

        expect(menuElement()).toBeFalsy();
        expect(menu.isOpen()).toBe(false);
    }));

    it('should select mobile view', fakeAsync(() => {
        const mobileViewSpy = jest.spyOn(menu as any, '_setupMobileMode');
        testComponent.mobileMode = true;
        fixture.detectChanges();
        tick();
        (<any>menu)._setupView();

        fixture.detectChanges();

        expect(mobileViewSpy).toHaveBeenCalled();
    }));

    it('should open after clicking on trigger on mobiles', () => {
        testComponent.mobileMode = true;
        fixture.detectChanges();
        (<any>menu)._listenOnTriggerRefClicks();

        expect(menu.isOpen()).toBe(false);

        fixture.detectChanges();
        menu.trigger?.nativeElement.dispatchEvent(new MouseEvent('click'));

        fixture.detectChanges();

        expect(menu.isOpen()).toBe(true);
    });

    it('should destroy all references', () => {
        const destroyEventsSpy = jest.spyOn(menu as any, '_destroyEventListeners');
        const destroyMobileSpy = jest.spyOn(menu as any, '_destroyMobileComponent');

        menu.ngOnDestroy();

        fixture.detectChanges();

        expect(destroyEventsSpy).toHaveBeenCalled();
        expect(destroyMobileSpy).toHaveBeenCalled();
    });

    it('disableScrollbar input should work correctly', () => {
        expect(menu.disableScrollbar()).toBeFalsy();
        testComponent.scrollbarDisabled = true;
        fixture.detectChanges();
        expect(menu.disableScrollbar()).toBeTruthy();
    });

    it('should properly sync isOpen signal state', () => {
        expect(menu.isOpen()).toBe(false);
        menu.isOpen.set(true);
        fixture.detectChanges();
        expect(menu.isOpen()).toBe(true);
    });

    it('should apply disabled host binding when disabled', () => {
        testComponent.isDisabled = true;
        fixture.detectChanges();
        expect(menu.disabled()).toBe(true);
        const menuElement = fixture.nativeElement.querySelector('fd-menu');
        expect(menuElement?.classList.contains('fd-popover-custom--disabled')).toBe(true);
    });

    it('should emit isOpenChange when open state changes', fakeAsync(() => {
        const emittedValues: boolean[] = [];
        menu.isOpenChange.subscribe((value) => emittedValues.push(value));

        (<any>menu)._setupView();
        fixture.detectChanges();
        tick();

        menu.open();
        fixture.detectChanges();
        tick();

        menu.close();
        fixture.detectChanges();
        tick();

        expect(emittedValues).toContain(true);
        expect(emittedValues).toContain(false);
    }));

    it('should emit beforeOpen when menu is about to open', fakeAsync(() => {
        let beforeOpenEmitted = false;
        menu.beforeOpen.subscribe(() => {
            beforeOpenEmitted = true;
        });

        (<any>menu)._setupView();
        fixture.detectChanges();
        tick();

        menu.open();
        fixture.detectChanges();
        tick();

        expect(beforeOpenEmitted).toBe(true);
    }));

    it('should toggle menu state', fakeAsync(() => {
        (<any>menu)._setupView();
        fixture.detectChanges();
        tick();

        expect(menu.isOpen()).toBe(false);

        menu.toggle();
        fixture.detectChanges();
        tick();

        expect(menu.isOpen()).toBe(true);

        menu.toggle();
        fixture.detectChanges();
        tick();

        expect(menu.isOpen()).toBe(false);
    }));

    it('should have correct elementRef injection', () => {
        expect(menu.elementRef).toBeTruthy();
        expect(menu.elementRef.nativeElement).toBeTruthy();
    });

    it('should have optional dialogConfig', () => {
        // dialogConfig should be null when not in dialog context
        expect(menu.dialogConfig).toBeNull();
    });

    it('should register and unregister addons', () => {
        const addon = { id: 'test-addon' };

        menu.registerAddon(addon);
        expect(menu['hasAddons']).toBe(true);

        menu.unregisterAddon(addon);
        expect(menu['hasAddons']).toBe(false);
    });
});

describe('MenuComponent with submenus', () => {
    let fixture: ComponentFixture<TestMenuSubmenuComponent>;
    let testComponent: TestMenuSubmenuComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuSubmenuComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuSubmenuComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should properly detect submenus and set hasPopup getter', () => {
        fixture.detectChanges();

        const menuItems = testComponent.menuItems.toArray();
        // Should include: 1 item with submenu, 2 submenu items, 1 regular item = 4 total
        expect(menuItems.length).toBe(4);

        // First item has submenu
        const firstItem = menuItems[0];
        expect(firstItem.submenu).toBeDefined();
        expect(firstItem.hasPopup).toBe(true);

        // Last item (Meat) doesn't have submenu
        const lastItem = menuItems[3];
        expect(lastItem.submenu).toBeUndefined();
        expect(lastItem.hasPopup).toBe(false);
    });

    it('should not show submenu in mobile mode (hasPopup should be false)', () => {
        testComponent.mobileMode = true;
        fixture.detectChanges();

        const menuItems = testComponent.menuItems.toArray();
        const firstItem = menuItems[0];

        // Even though submenu exists, hasPopup should be false in mobile mode
        expect(firstItem.submenu).toBeDefined();
        expect(firstItem.hasPopup).toBe(false);
    });

    it('should call mobile() signal correctly in hasPopup getter', () => {
        fixture.detectChanges();

        const menuItems = testComponent.menuItems.toArray();
        const firstItem = menuItems[0];
        const menuService = firstItem.menuService;

        // Desktop mode - hasPopup should be true
        expect(menuService?.menuComponent?.mobile()).toBe(false);
        expect(firstItem.hasPopup).toBe(true);

        // Switch to mobile mode
        testComponent.mobileMode = true;
        fixture.detectChanges();

        // Mobile mode - hasPopup should be false
        expect(menuService?.menuComponent?.mobile()).toBe(true);
        expect(firstItem.hasPopup).toBe(false);
    });

    it('should auto-disable scrollbar when menu has submenus', fakeAsync(() => {
        fixture.detectChanges();
        tick();

        const menu = testComponent.menu;
        const popoverService = menu['_popoverService'];

        // Menu has submenu, scrollbar should be auto-disabled
        // Note: This is handled by the effect in the constructor
        // The effect needs time to run after afterNextRender
        tick(100);
        fixture.detectChanges();

        // The popover service should have disableScrollbar set to true
        // because the menu has submenus
        expect(popoverService.disableScrollbar()).toBe(true);
    }));
});

describe('MenuComponent config input', () => {
    @Component({
        selector: 'fd-menu-config-test',
        template: `
            <fd-menu #menu [config]="menuConfig">
                <li fd-menu-item>
                    <a href="#" fd-menu-interactive>
                        <span fd-menu-title>Option 1</span>
                    </a>
                </li>
            </fd-menu>
            <button #trigger [fdMenuTrigger]="menu"></button>
        `,
        standalone: true,
        imports: [MenuModule]
    })
    class TestMenuConfigComponent {
        @ViewChild(MenuComponent) menu: MenuComponent;
        menuConfig = {
            placement: 'top-start' as const,
            noArrow: false
        };
    }

    let fixture: ComponentFixture<TestMenuConfigComponent>;
    let testComponent: TestMenuConfigComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuConfigComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuConfigComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should accept config input', () => {
        expect(testComponent.menu.config()).toEqual({
            placement: 'top-start',
            noArrow: false
        });
    });

    it('should merge config with individual inputs', () => {
        // Config says placement: 'top-start', but individual input defaults to 'bottom-start'
        // Individual inputs should take precedence
        expect(testComponent.menu.placement()).toBe('bottom-start');
    });
});
