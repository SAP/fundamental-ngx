import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MenuComponent,
    MenuItemComponent,
    MenuMobileComponent,
    MenuMobileModule,
    MenuModule
} from '@fundamental-ngx/core/menu';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { getMobileModeViewElements, MOBILE_CONFIG_TEST_TOKEN, whenStable } from '@fundamental-ngx/core/tests';

const MOBILE_CONFIG: MobileModeConfig = { title: 'Test menu title' };

@Component({
    template: `
        <fd-menu [mobile]="true" [mobileConfig]="mobileConfig">
            <li fd-menu-item [submenu]="submenu">
                <div fd-menu-interactive>
                    <span fd-menu-title>Menu option</span>
                </div>
            </li>
        </fd-menu>

        <fd-submenu #submenu>
            <li fd-menu-item>
                <div fd-menu-interactive>Sub menu option</div>
            </li>
        </fd-submenu>
    `
})
class TesNestedMenuItemComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;

    constructor(
        public elementRef: ElementRef,
        @Inject(MOBILE_CONFIG_TEST_TOKEN) public mobileConfig: MobileModeConfig
    ) {}
}

describe('MenuMobileComponent', () => {
    let menu: MenuComponent;
    let menuMobile: MenuMobileComponent;
    let fixture: ComponentFixture<TesNestedMenuItemComponent>;

    async function setup(mobileConfig: MobileModeConfig = MOBILE_CONFIG): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [TesNestedMenuItemComponent],
            imports: [MenuModule, MenuMobileModule, BrowserAnimationsModule],
            providers: [{ provide: MOBILE_CONFIG_TEST_TOKEN, useValue: mobileConfig }]
        }).compileComponents();

        fixture = TestBed.createComponent(TesNestedMenuItemComponent);

        await whenStable(fixture);

        menu = fixture.componentInstance.menu;
        menuMobile = menu._getMobileMenuComponentRef().instance;

        await whenStable(fixture);
    }

    it('should open in mobile mode', async () => {
        await setup();

        const openDialogSpy = spyOn<any>(menuMobile, '_openDialog').and.callThrough();

        menu.open();

        await whenStable(fixture);

        expect(openDialogSpy).toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    });

    it('should use custom dialog configuration', async () => {
        const customDialogClass = 'test-dialog-class';

        await setup({ dialogConfig: { dialogPanelClass: customDialogClass } });

        menu.open();

        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.' + customDialogClass)).toBeTruthy();
    });

    it('should open menu sub-level', async () => {
        await setup();

        menu.open();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        await whenStable(fixture);

        expect(menuMobile.isSubmenu).toBeTrue();
    });

    it('should use correct menu title', async () => {
        await setup();

        menu.open();

        await whenStable(fixture);

        expect(menuMobile.title).toEqual(MOBILE_CONFIG.title);

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        await whenStable(fixture);

        expect(menuMobile.title).toEqual('Menu option');
    });

    it('should navigate back to parent level', async () => {
        await setup();

        menu.open();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('[fd-menu-interactive]').click();

        await whenStable(fixture);

        expect(menuMobile.isSubmenu).toBeTrue();
        fixture.nativeElement.querySelector('#menu-mobile-navigate-back').click();

        await whenStable(fixture);

        expect(menuMobile.isSubmenu).toBeFalse();
    });

    it('should properly render with empty MobileConfig', async () => {
        await setup({});

        menu.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(0);
    });

    it('should properly render title and close button based on MobileConfig', async () => {
        await setup({ title: MOBILE_CONFIG.title, hasCloseButton: true });

        menu.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeTruthy();
        expect(mobileElements.footerButtons.length).toEqual(0);
        expect(mobileElements.dialogTitle.textContent).toContain(MOBILE_CONFIG.title);
    });

    it('should properly render approve and dismiss buttons based on MobileConfig', async () => {
        await setup({ cancelButtonText: 'APPROVE', approveButtonText: 'DISMISS' });

        menu.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogFooter).toBeTruthy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(2);
    });
});
