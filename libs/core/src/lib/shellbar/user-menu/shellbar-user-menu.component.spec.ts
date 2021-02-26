import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarUserMenuComponent } from './shellbar-user-menu.component';
import { MenuModule } from '../../menu/menu.module';
import { PopoverModule } from '../../popover/popover.module';

describe('UserMenuComponent', () => {
    let component: ShellbarUserMenuComponent;
    let fixture: ComponentFixture<ShellbarUserMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, MenuModule],
            declarations: [ShellbarUserMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarUserMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
