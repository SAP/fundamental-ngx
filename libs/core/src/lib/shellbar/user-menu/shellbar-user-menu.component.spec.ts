import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarUserMenuComponent } from './shellbar-user-menu.component';
import { MenuModule, PopoverModule } from '@fundamental-ngx/core';

describe('UserMenuComponent', () => {
    let component: ShellbarUserMenuComponent;
    let fixture: ComponentFixture<ShellbarUserMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, MenuModule],
            declarations: [ShellbarUserMenuComponent]
        })
            .compileComponents();
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
