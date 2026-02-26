import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent, SubmenuComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';

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

        <button #trigger [fdMenuTrigger]="menu">Open Menu</button>
    `,
    standalone: true,
    imports: [MenuModule]
})
export class TestMenuComponent {
    @ViewChild(MenuComponent)
    menu: MenuComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    @ViewChild('trigger', { read: ElementRef })
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

        <button #trigger [fdMenuTrigger]="menu">Open Menu</button>
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

    @ViewChild('trigger', { read: ElementRef })
    trigger: ElementRef;

    mobileMode = false;
}

describe('MenuComponent', () => {
    let menu: MenuComponent;
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
    });

    it('should create', () => {
        expect(menu).toBeTruthy();
    });

    describe('opening and closing', () => {
        it('should open menu when open() is called', fakeAsync(() => {
            expect(menu.isOpen()).toBe(false);

            menu.open();
            fixture.detectChanges();
            tick();

            expect(menu.isOpen()).toBe(true);
        }));

        it('should close menu when close() is called', fakeAsync(() => {
            menu.open();
            fixture.detectChanges();
            tick();
            expect(menu.isOpen()).toBe(true);

            menu.close();
            fixture.detectChanges();
            tick();

            expect(menu.isOpen()).toBe(false);
        }));

        it('should toggle menu state', fakeAsync(() => {
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

        it('should display menu items when menu is open', fakeAsync(() => {
            menu.open();
            fixture.detectChanges();
            tick();

            const menuItems = document.querySelectorAll('[fd-menu-interactive]');
            expect(menuItems.length).toBe(3);
        }));

        it('should not display menu items when menu is closed', fakeAsync(() => {
            menu.open();
            fixture.detectChanges();
            tick();

            menu.close();
            fixture.detectChanges();
            tick();

            const menuItems = document.querySelectorAll('[fd-menu-interactive]');
            expect(menuItems.length).toBe(0);
        }));
    });

    describe('event emission', () => {
        it('should emit isOpenChange when open state changes', fakeAsync(() => {
            const emittedValues: boolean[] = [];
            menu.isOpenChange.subscribe((value) => emittedValues.push(value));

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

            menu.open();
            fixture.detectChanges();
            tick();

            expect(beforeOpenEmitted).toBe(true);
        }));
    });

    describe('trigger interactions', () => {
        it('should open menu when user clicks trigger button', fakeAsync(() => {
            expect(menu.isOpen()).toBe(false);

            testComponent.trigger.nativeElement.click();
            fixture.detectChanges();
            tick();

            expect(menu.isOpen()).toBe(true);
        }));

        it('should toggle menu on repeated trigger clicks', fakeAsync(() => {
            testComponent.trigger.nativeElement.click();
            fixture.detectChanges();
            tick();
            expect(menu.isOpen()).toBe(true);

            testComponent.trigger.nativeElement.click();
            fixture.detectChanges();
            tick();
            expect(menu.isOpen()).toBe(false);
        }));
    });

    describe('disabled state', () => {
        it('should apply disabled host class when disabled', () => {
            testComponent.isDisabled = true;
            fixture.detectChanges();

            const menuElement = fixture.nativeElement.querySelector('fd-menu');
            expect(menuElement?.classList.contains('fd-popover-custom--disabled')).toBe(true);
        });

        it('should reflect disabled input in disabled signal', () => {
            expect(menu.disabled()).toBe(false);
            testComponent.isDisabled = true;
            fixture.detectChanges();
            expect(menu.disabled()).toBe(true);
        });
    });

    describe('scrollbar configuration', () => {
        it('should apply disableScrollbar setting', () => {
            expect(menu.disableScrollbar()).toBeFalsy();
            testComponent.scrollbarDisabled = true;
            fixture.detectChanges();
            expect(menu.disableScrollbar()).toBeTruthy();
        });
    });

    describe('element access', () => {
        it('should have elementRef injection', () => {
            expect(menu.elementRef).toBeTruthy();
            expect(menu.elementRef.nativeElement).toBeTruthy();
        });

        it('should have optional dialogConfig as null when not in dialog context', () => {
            expect(menu.dialogConfig).toBeNull();
        });
    });

    describe('cleanup', () => {
        it('should clean up without errors on destroy', () => {
            expect(() => menu.ngOnDestroy()).not.toThrow();
        });
    });
});

describe('MenuComponent with submenus', () => {
    let fixture: ComponentFixture<TestMenuSubmenuComponent>;
    let testComponent: TestMenuSubmenuComponent;
    let menu: MenuComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuSubmenuComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuSubmenuComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        menu = testComponent.menu;
    });

    it('should detect menu items with submenus', () => {
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

    it('should not show hasPopup for submenu items in mobile mode', () => {
        testComponent.mobileMode = true;
        fixture.detectChanges();

        const menuItems = testComponent.menuItems.toArray();
        const firstItem = menuItems[0];

        // Even though submenu exists, hasPopup should be false in mobile mode
        expect(firstItem.submenu).toBeDefined();
        expect(firstItem.hasPopup).toBe(false);
    });

    it('should correctly reflect mobile mode changes', () => {
        const menuItems = testComponent.menuItems.toArray();
        const firstItem = menuItems[0];

        // Desktop mode - hasPopup should be true
        expect(menu.mobile()).toBe(false);
        expect(firstItem.hasPopup).toBe(true);

        // Switch to mobile mode
        testComponent.mobileMode = true;
        fixture.detectChanges();

        // Mobile mode - hasPopup should be false
        expect(menu.mobile()).toBe(true);
        expect(firstItem.hasPopup).toBe(false);
    });

    it('should open submenu when user hovers over item with submenu', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();
        tick();

        const menuItems = testComponent.menuItems.toArray();
        const itemWithSubmenu = menuItems[0];
        const interactiveElement = itemWithSubmenu.menuInteractive.elementRef.nativeElement;

        interactiveElement.dispatchEvent(new MouseEvent('mouseenter'));
        tick();

        expect(itemWithSubmenu.submenuVisible).toBe(true);
    }));

    it('should close submenu when user hovers over sibling item', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();
        tick();

        const menuItems = testComponent.menuItems.toArray();
        const itemWithSubmenu = menuItems[0];
        const siblingItem = menuItems[3]; // Meat item
        const interactiveElement = itemWithSubmenu.menuInteractive.elementRef.nativeElement;

        // First hover over item with submenu
        interactiveElement.dispatchEvent(new MouseEvent('mouseenter'));
        tick();
        expect(itemWithSubmenu.submenuVisible).toBe(true);

        // Then hover over sibling
        siblingItem.menuInteractive.elementRef.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
        tick();

        expect(itemWithSubmenu.submenuVisible).toBe(false);
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
            <button #trigger [fdMenuTrigger]="menu">Open Menu</button>
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

    it('should use individual input defaults over config values', () => {
        // Individual inputs should take precedence
        expect(testComponent.menu.placement()).toBe('bottom-start');
    });
});
