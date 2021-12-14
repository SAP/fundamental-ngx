import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuModule } from './menu.module';
import { MenuService } from './services/menu.service';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY, DynamicComponentService } from '../utils/public_api';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu #menu [mobile]="isMobile">
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

        <button #trigger [fdMenuTrigger]="menu">Menu button</button>
    `
})
export class TestMenuComponent {
    @ViewChild(MenuComponent)
    menu: MenuComponent;

    @ViewChild('trigger', { read: ElementRef })
    trigger: ElementRef;

    isMobile = false;
}

describe('MenuComponent', () => {
    let menu: MenuComponent;
    let menuService: Readonly<MenuService>;
    let fixture: ComponentFixture<TestMenuComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [MenuModule, NoopAnimationsModule],
                declarations: [TestMenuComponent],
                providers: [ContentDensityService, DynamicComponentService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuService = menu._getMenuService();
    });

    it('should properly initialize menu', () => {
        expect(menu).toBeTruthy();
        expect(menuService.menuMap).toBeTruthy();
    });

    it('should handle content density when compact input is not provided', () => {
        menu.ngOnInit();
        expect(menu.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
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

    it('should open menu in popover in desktop mode', () => {
        expect(menu.isOpen).toBeFalse();

        fixture.componentInstance.trigger.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(menu.isOpen).toBeTrue();

        const menuElement = document.querySelector('fd-popover-body .fd-menu');

        expect(menuElement).not.toBe(null);
        expect(menuElement.textContent).toContain('Option 1');
        expect(menuElement.textContent).toContain('Option 2');
        expect(menuElement.textContent).toContain('Option 3');
    });

    it('should open menu in dialog in mobile mode', async () => {
        fixture.componentInstance.isMobile = true;
        fixture.detectChanges();

        // fd-menu-mobile async creation
        // fakeAsync + tick() throws error "2 timer(s) still in the queue."
        await new Promise((resolve) => setTimeout(resolve));
        fixture.detectChanges();

        expect(menu.isOpen).toBeFalse();

        fixture.componentInstance.trigger.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();

        expect(menu.isOpen).toBeTrue();

        const mobileMenu = document.querySelector('fd-dialog .fd-menu.fd-menu--mobile');

        expect(mobileMenu).not.toBe(null);
        expect(mobileMenu.textContent).toContain('Option 1');
        expect(mobileMenu.textContent).toContain('Option 2');
        expect(mobileMenu.textContent).toContain('Option 3');
    });

    it('should focus first element on open', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();
        tick();

        expect(menu.menuItems.first.elementRef.nativeElement).toBe(document.activeElement);
    }));
});
