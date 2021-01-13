import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BarModule } from '../../../../bar/bar.module';
import { ListModule } from '../../../../list/list.module';
import { whenStable } from '../../../../utils/tests';
import { ShellbarUser } from '../../../model/shellbar-user';
import { UserActionsMenuModule } from '../../user-actions-menu.module';
import { UserActionsMenuComponent } from '../user-actions-menu/user-actions-menu.component';

@Component({
    selector: 'fd-test-user-actions-menu',
    template: `
        <fd-user-actions-menu [user]="user">
            <ul fd-list [noBorder]="true" navigationIndicator="true">
                <li fd-list-item fd-user-actions-menu-item [submenu]="subMenu1">
                    <a fd-list-link navigationIndicator="true" (click)="clickUserAction($event)">
                        <i fd-list-icon glyph="example"></i>
                        <span fd-list-title> Submenu </span>
                    </a>
                </li>
            </ul>
        </fd-user-actions-menu>

        <fd-user-actions-submenu #subMenu1 title="SubMenu level 1">
            <ul fd-list [noBorder]="true" navigationIndicator="true">
                <li fd-list-item fd-user-actions-menu-item>
                    <a fd-list-link>
                        <i fd-list-icon glyph="border"></i>
                        <span fd-list-title>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        </span>
                    </a>
                </li>
                <li fd-list-item fd-user-actions-menu-item>
                    <a fd-list-link [routerLink]="['/']">
                        <i fd-list-icon glyph="chain-link"></i>
                        <span fd-list-title> Router link </span>
                    </a>
                </li>
            </ul>

            <fd-user-actions-menu-footer align="right">
                <fd-button-bar label="Sign Out" fdType="transparent"></fd-button-bar>
            </fd-user-actions-menu-footer>
        </fd-user-actions-submenu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
    @ViewChild(UserActionsMenuComponent)
    userActionsMenuComponent: UserActionsMenuComponent;

    user: ShellbarUser = {
        fullName: 'John Doe',
        image: 'https://i.pravatar.cc/150?img=2',
        colorAccent: 1
    };
}

describe('UserActionsSubmenuComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let userActionsMenuComponent: UserActionsMenuComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, UserActionsMenuComponent],
            imports: [UserActionsMenuModule, ListModule, BarModule]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;

        await whenStable(fixture);

        userActionsMenuComponent = component.userActionsMenuComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show 2 submenu items', async () => {
        const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

        button.nativeElement.click();

        await whenStable(fixture);

        const listItem = fixture.debugElement.query(By.css('.fd-user-menu__body .fd-list__item'));

        expect(listItem).toBeTruthy();

        listItem.nativeElement.click();

        await whenStable(fixture);

        const submenuItems = fixture.debugElement.queryAll(By.css('.fd-user-menu__body .fd-list__item'));

        expect(submenuItems.length).toEqual(2);
    });

    it('should show submenu header with back button and title', async () => {
      const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

      button.nativeElement.click();

      await whenStable(fixture);

      const listItem = fixture.debugElement.query(By.css('.fd-user-menu__body .fd-list__item'));

      expect(listItem).toBeTruthy();

      listItem.nativeElement.click();

      await whenStable(fixture);

      const header = fixture.debugElement.query(By.css('fd-user-actions-menu-header'));

      expect(header).toBeTruthy();

      const backButton = header.query(By.css('.fd-button'));

      expect(backButton).toBeTruthy();

      const [, title] = header.queryAll(By.css('fd-bar-element'));

      expect(title.nativeElement.innerText).toEqual('SubMenu level 1');
  });

  it('should show start menu list after click on the back button', async () => {
    const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

    button.nativeElement.click();

    await whenStable(fixture);

    const listItem = fixture.debugElement.query(By.css('.fd-user-menu__body .fd-list__item'));

    expect(listItem).toBeTruthy();

    listItem.nativeElement.click();

    await whenStable(fixture);

    const header = fixture.debugElement.query(By.css('fd-user-actions-menu-header'));

    expect(header).toBeTruthy();

    const backButton = header.query(By.css('.fd-button'));

    backButton.nativeElement.click();

    await whenStable(fixture);

    const mainListItem = fixture.debugElement.queryAll(By.css('.fd-user-menu__body .fd-list__item'));

    expect(mainListItem.length).toEqual(1);
});

    it('should show submenu footer with button', async () => {
        const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

        button.nativeElement.click();

        await whenStable(fixture);

        const listItem = fixture.debugElement.query(By.css('.fd-user-menu__body .fd-list__item'));

        expect(listItem).toBeTruthy();

        listItem.nativeElement.click();

        await whenStable(fixture);

        const footerButton = fixture.debugElement.query(By.css('fd-user-actions-menu-footer .fd-button'));

        expect(footerButton).toBeTruthy();
    });
});
