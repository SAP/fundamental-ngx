import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { MenuMobileComponent } from './menu-mobile.component';
import { Component, ElementRef, Inject, InjectionToken, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { MenuInteractiveDirective } from '../directives/menu-interactive.directive';
import { MenuItemComponent, SubmenuComponent } from '../menu-item/menu-item.component';
import { PopoverModule } from '../../popover/popover.module';
import { CommonModule } from '@angular/common';
import { MenuMobileModule } from './menu-mobile.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuTitleDirective } from '../directives/menu-title.directive';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { getMobileModeViewElements, whenStable } from '../../utils/tests';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '../../button/button.module';

const MOBILE_CONFIG_TEST_TOKEN = new InjectionToken<MobileModeConfig>('For test purposes');
const MOBILE_CONFIG: MobileModeConfig = { title: 'Test menu title' };

@Component({
    template: `
        <fd-menu [mobile]="true" [mobileConfig]="mobileConfig">
            <li fd-menu-item [submenu]="submenu">
                <div fd-menu-interactive>
                    <span fd-menu-title>{{ menuItemTitle }}</span>
                </div>
            </li>
        </fd-menu>

        <fd-submenu #submenu>
            <li fd-menu-item>
                <div fd-menu-interactive></div>
            </li>
        </fd-submenu>
    `
})
class TesNestedMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChild('menuItem') menuItem: MenuItemComponent;

    menuItemTitle = 'Test item title';

    constructor(
        public elementRef: ElementRef,
        @Inject(MOBILE_CONFIG_TEST_TOKEN) public mobileConfig: MobileModeConfig
    ) {}
}

describe('MenuMobileComponent', () => {
    let menu: MenuComponent;
    let menuMobile: MenuMobileComponent;
    let fixture: ComponentFixture<TesNestedMenuItemComponent>;

    beforeEach(waitForAsync(() => {
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
            imports: [CommonModule, PopoverModule, MenuMobileModule, NoopAnimationsModule, RouterTestingModule, ButtonModule],
        })
            .compileComponents();
    }));

    function setup(mobileConfig: MobileModeConfig = MOBILE_CONFIG): void {
        TestBed.overrideProvider(MOBILE_CONFIG_TEST_TOKEN, { useValue: mobileConfig });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(TesNestedMenuItemComponent);
        fixture.detectChanges();
        menu = fixture.componentInstance.menu;
        menuMobile = fixture.componentInstance.menu['_mobileModeComponentRef'].instance;
    }

    it('should create', () => {
        setup();
        expect(menu).toBeTruthy();
        expect(menuMobile).toBeTruthy();
    });

    it('should open in mobile mode', fakeAsync(() => {
        setup();
        const openDialogSpy = spyOn<any>(menuMobile, '_openDialog').and.callThrough();

        menu.open();
        fixture.detectChanges();

        tick();

        expect(openDialogSpy).toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    }));

    it('should use custom dialog configuration', fakeAsync(() => {
        const customDialogClass = 'test-dialog-class';

        setup({ dialogConfig: { dialogPanelClass: customDialogClass }});

        menu.open();
        fixture.detectChanges();

        tick();

        expect(fixture.nativeElement.querySelector('.' + customDialogClass)).toBeTruthy();
    }));

    it('should open menu sub-level', async () => {
        setup();
        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.isSubmenu).toBeTrue();
    });

    it('should use correct menu title', async () => {
        setup();
        menu.open();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.title).toEqual(MOBILE_CONFIG.title);

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(menuMobile.title).toEqual(fixture.componentInstance.menuItemTitle);
    });

    it('should navigate back to parent level', async () => {
        setup();
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


    it('should properly render with empty MobileConfig', async () => {
        setup({});

        await whenStable(fixture);

        menu.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(0);

    });

    it('should properly render title and close button based on MobileConfig', async () => {
        setup({title: MOBILE_CONFIG.title, hasCloseButton: true});

        await whenStable(fixture);

        menu.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeTruthy();
        expect(mobileElements.footerButtons.length).toEqual(0);
        expect(mobileElements.dialogTitle.textContent).toContain(MOBILE_CONFIG.title);
    });

    it('should properly render approve and dismiss buttons based on MobileConfig', async () => {
        setup({cancelButtonText: 'APPROVE', approveButtonText: 'DISMISS'});

        await whenStable(fixture);

        menu.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogFooter).toBeTruthy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(2);
    });
});
