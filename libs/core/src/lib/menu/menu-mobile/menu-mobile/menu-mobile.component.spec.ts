import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MenuMobileComponent } from './menu-mobile.component';
import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from '../../menu.component';
import { MenuInteractiveDirective } from '../../directives/menu-interactive.directive';
import { MenuItemComponent, SubmenuComponent } from '../../menu-item/menu-item.component';
import { PopoverModule } from '../../../popover/popover.module';
import { CommonModule } from '@angular/common';
import { DIALOG_CONFIG } from '../../../dialog/dialog-utils/dialog-config.class';
import { MenuMobileModule } from '../menu-mobile.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    template: `
        <fd-menu [mobile]="true" [title]="menuTitle">
            <li fd-menu-item [submenu]="submenu">
                <div fd-menu-interactive #menuInteractive>
                    <span fd-menu-title>{{ menuItemTitle }}</span>
                </div>
            </li>
        </fd-menu>

        <fd-submenu #submenu="fdSubmenu">
            <li fd-menu-item>
                <div fd-menu-interactive [id]="nestedMenuItemId"></div>
            </li>
        </fd-submenu>
    `
})
class TesNestedMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChild('menuInteractive') menuInteractive: MenuInteractiveDirective;

    menuTitle: string = 'Test menu title';
    menuItemTitle: string = 'Test item title';
    nestedMenuItemId: string = 'test-id';
}

describe('MenuMobileComponent', () => {
    let menu: MenuComponent;
    let menuMobile: MenuMobileComponent;
    let menuInteractive: MenuInteractiveDirective;
    let fixture: ComponentFixture<TesNestedMenuItemComponent>;
    const customDialogClass = 'test-dialog-class';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TesNestedMenuItemComponent,
                MenuInteractiveDirective,
                MenuMobileComponent,
                MenuItemComponent,
                SubmenuComponent,
                MenuComponent
            ],
            imports: [CommonModule, PopoverModule, MenuMobileModule, NoopAnimationsModule],
            providers: [{provide: DIALOG_CONFIG, useValue: {customDialogClass: customDialogClass}}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TesNestedMenuItemComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuInteractive = fixture.componentInstance.menuInteractive;
        menuMobile = fixture.componentInstance.menu['_mobileModeComponentRef'].instance;
    });

    it('should create', () => {
        expect(menu).toBeTruthy();
        expect(menuMobile).toBeTruthy();
        expect(menuInteractive).toBeTruthy();
    });

    it('should open in mobile mode', async () => {
        const openDialogSpy = spyOn<any>(menuMobile, '_openDialog');

        menu.open();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(openDialogSpy).toHaveBeenCalled();
    });

    xit('should use custom dialog configuration', async() => {
        menu.open();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(document.querySelector('.' + customDialogClass)).toBeTruthy();
    });

    xit('should open menu sub-level', fakeAsync(() => {
        const loadMenuViewSpy = spyOn<any>(menuMobile, '_setMenuView');

        menu.open();
        fixture.detectChanges();

        tick();

        menuInteractive.elementRef.nativeElement.click();
        fixture.detectChanges();

        tick();

        expect(menuMobile.isSubmenu).toBeTrue();
        expect(loadMenuViewSpy).toHaveBeenCalledTimes(2);
        expect(document.getElementById(fixture.componentInstance.nestedMenuItemId)).toHaveBeenCalledTimes(2);
    }));

    xit('should use correct menu title', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();

        tick();

        expect(menuMobile.title).toEqual(fixture.componentInstance.menuTitle);

        menuInteractive.elementRef.nativeElement.click();
        fixture.detectChanges();

        tick();

        expect(menuMobile.title).toEqual(fixture.componentInstance.menuItemTitle);
    }));

    xit('should navigate back to parent level', fakeAsync(() => {
        menu.open();
        fixture.detectChanges();

        tick();

        menuInteractive.elementRef.nativeElement.click();
        fixture.detectChanges();

        tick();

        expect(menuMobile.isSubmenu).toBeTrue();
        expect(document.getElementById(fixture.componentInstance.nestedMenuItemId)).toBeTruthy();

        document.getElementById('menu-mobile-navigate-back').click();
        fixture.detectChanges();

        tick();

        expect(menuMobile.isSubmenu).toBeFalse();
        expect(document.getElementById(fixture.componentInstance.nestedMenuItemId)).toBeFalsy();
    }));
});
