import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MenuMobileComponent } from './menu-mobile.component';
import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { MenuInteractiveDirective } from '../directives/menu-interactive.directive';
import { MenuItemComponent, SubmenuComponent } from '../menu-item/menu-item.component';
import { PopoverModule } from '../../popover/popover.module';
import { CommonModule } from '@angular/common';
import { DIALOG_CONFIG } from '../../dialog/dialog-utils/dialog-config.class';
import { MenuMobileModule } from './menu-mobile.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuTitleDirective } from '../directives/menu-title.directive';
import { MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    template: `
        <fd-menu [mobile]="true" [mobileConfig]="mobileConfig">
            <li fd-menu-item [submenu]="submenu">
                <div fd-menu-interactive>
                    <span fd-menu-title>{{ menuItemTitle }}</span>
                </div>
            </li>
        </fd-menu>

        <fd-submenu #submenu="fdSubmenu">
            <li fd-menu-item>
                <div fd-menu-interactive></div>
            </li>
        </fd-submenu>
    `
})
class TesNestedMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChild('menuItem') menuItem: MenuItemComponent;

    menuTitle: string = 'Test menu title';
    menuItemTitle: string = 'Test item title';
    mobileConfig: MobileModeConfig = {title: this.menuTitle};
}

describe('MenuMobileComponent', () => {
    let menu: MenuComponent;
    let menuMobile: MenuMobileComponent;
    let fixture: ComponentFixture<TesNestedMenuItemComponent>;
    const customDialogClass = 'test-dialog-class';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TesNestedMenuItemComponent,
                MenuInteractiveDirective,
                MenuMobileComponent,
                MenuTitleDirective,
                MenuItemComponent,
                SubmenuComponent,
                MenuComponent
            ],
            imports: [CommonModule, PopoverModule, MenuMobileModule, NoopAnimationsModule],
            providers: [{provide: DIALOG_CONFIG, useValue: {dialogPanelClass: customDialogClass}}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TesNestedMenuItemComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuMobile = fixture.componentInstance.menu['_mobileModeComponentRef'].instance;
    });

    it('should create', () => {
        expect(menu).toBeTruthy();
        expect(menuMobile).toBeTruthy();
    });

    it('should open in mobile mode', fakeAsync(() => {
        const openDialogSpy = spyOn<any>(menuMobile, '_openDialog').and.callThrough();

        menu.open();
        fixture.detectChanges();

        tick();

        expect(openDialogSpy).toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    }));

    it('should use custom dialog configuration', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();

        tick();

        expect(fixture.nativeElement.querySelector('.' + customDialogClass)).toBeTruthy();
    }));

    it('should open menu sub-level', async () => {
        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.isSubmenu).toBeTrue();
    });

    it('should use correct menu title', async () => {
        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.title).toEqual(fixture.componentInstance.menuTitle);

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.title).toEqual(fixture.componentInstance.menuItemTitle);
    });

    it('should navigate back to parent level', async () => {
        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.isSubmenu).toBeTrue();
        fixture.nativeElement.querySelector('#menu-mobile-navigate-back').click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.isSubmenu).toBeFalse();
    });

    it('should have dialog elements based on MobileConfig', async () => {
        fixture.componentInstance.mobileConfig = {
            hasCloseButton: true,
            cancelButtonText: 'cancel',
            approveButtonText: 'approve',
            title: fixture.componentInstance.menuTitle
        };

        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.nativeElement.querySelector('[fd-dialog-close-button]')).toBeTruthy();
        expect(fixture.nativeElement.querySelectorAll('[fd-dialog-decisive-button]').length).toEqual(2);
        expect(fixture.nativeElement.querySelector('[fd-dialog-title]').textContent).toContain(fixture.componentInstance.menuTitle);

        menu.close();

        fixture.detectChanges();
        await fixture.whenStable();

        fixture.componentInstance.mobileConfig = {
            hasCloseButton: false,
            cancelButtonText: null,
            approveButtonText: null
        };

        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.nativeElement.querySelector('fd-dialog-footer')).toBeFalsy();
        expect(fixture.nativeElement.querySelector('[fd-dialog-close-button]')).toBeFalsy();
        expect(fixture.nativeElement.querySelectorAll('[fd-dialog-decisive-button]').length).toEqual(0);
    });
});
