import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarActionsComponent } from './shellbar-actions.component';

import { MenuModule } from '../../menu/menu.module';
import { PopoverModule } from '../../popover/popover.module';
import { ShellbarUserMenuComponent } from '../user-menu/shellbar-user-menu.component';
import { ButtonModule } from '../../button/button.module';
import { ProductSwitchModule } from '../../product-switch/product-switch.module';
import { IconModule } from '../../icon/icon.module';
import { ShellbarActionsMobileComponent } from './shellbar-actions-mobile.component';

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ShellbarActionsComponent, ShellbarActionsMobileComponent, ShellbarUserMenuComponent],
            imports: [MenuModule, PopoverModule, ButtonModule, IconModule, ProductSwitchModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
