import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListModule } from '../../../../list/list.module';
import { whenStable } from '../../../../utils/tests';
import { ShellbarUser } from '../../../model/shellbar-user';
import { UserActionsMenuModule } from '../../user-actions-menu.module';
import { UserActionsMenuComponent } from './user-actions-menu.component';

@Component({
    selector: 'fd-test-user-actions-menu',
    template: `
        <fd-user-actions-menu [user]="user">
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

describe('UserActionsMenuComponent', () => {
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

    it('should open popover after click on button', async () => {
        const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

        button.nativeElement.click();

        await whenStable(fixture);

        expect(userActionsMenuComponent.isOpen).toEqual(true);
    });

    it('should show 3 items', async () => {
        const button = fixture.debugElement.query(By.css('.fd-user-menu__popover-control'));

        button.nativeElement.click();

        await whenStable(fixture);

        const listItems = fixture.debugElement.queryAll(By.css('.fd-user-menu__body .fd-list__item'));

        expect(listItems.length).toEqual(component.userMenuListItems.length);
    });
});
