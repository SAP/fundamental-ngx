import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListModule } from '../../../../list/list.module';
import { whenStable } from '../../../../utils/tests';
import { ShellbarUser } from '../../../model/shellbar-user';
import { UserActionsMenuModule } from '../../user-actions-menu.module';
import { UserActionsMenuComponent } from '../user-actions-menu/user-actions-menu.component';

@Component({
    selector: 'fd-test-user-actions-menu',
    template: `
        <fd-user-actions-menu [user]="user">
            <fd-user-actions-menu-header>
                <fd-avatar
                    fd-user-actions-menu-header-addon-left
                    size="xs"
                    [colorAccent]="user.colorAccent"
                    [circle]="true"
                    image="https://i.pravatar.cc/150"
                >
                </fd-avatar>

                <button
                    fd-user-actions-menu-header-addon-right
                    fd-button
                    aria-label="Header addon right"
                    title="Header addon right"
                    glyph="grid"
                    fdType="transparent"
                ></button>
            </fd-user-actions-menu-header>

            <ul fd-list [noBorder]="true" navigationIndicator="true">
                <li fd-list-item fd-user-actions-menu-item *ngFor="let item of userMenuListItems">
                    <a fd-list-link>
                        <i fd-list-icon [glyph]="item.glyph"></i>
                        <span fd-list-title> {{ item.text }} </span>
                    </a>
                </li>
            </ul>
        </fd-user-actions-menu>
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

    userMenuListItems = [
        { text: 'Settings', glyph: 'action-settings' },
        { text: 'Contact', glyph: 'email' },
        { text: 'Sign Out', glyph: 'log' }
    ];
}

describe('UserActionsMenuHeaderComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let userActionsMenuComponent: UserActionsMenuComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, UserActionsMenuComponent],
            imports: [UserActionsMenuModule, ListModule]
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

    it('should be present', async () => {
        const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

        button.nativeElement.click();

        await whenStable(fixture);

        const header = fixture.debugElement.query(By.css('fd-user-actions-menu-header'));

        expect(header).toBeTruthy();
    });

    it('should contain 2 addons and one avatar', async () => {
        const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

        button.nativeElement.click();

        await whenStable(fixture);

        const header = fixture.debugElement.query(By.css('fd-user-actions-menu-header'));
        const addonLeft = header.query(By.css('.fd-user-menu__header-addon-left'));
        const addonRight = header.query(By.css('.fd-user-menu__header-addon-right'));
        const avatar = header.query(By.css('.fd-user-menu__avatar'));

        expect(addonLeft).toBeTruthy();
        expect(addonRight).toBeTruthy();
        expect(avatar).toBeTruthy();
    });
});
