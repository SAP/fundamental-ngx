import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarModule, ShellbarUserMenuComponent } from '@fundamental-ngx/core/shellbar';

describe('UserMenuComponent', () => {
    let component: ShellbarUserMenuComponent;
    let fixture: ComponentFixture<ShellbarUserMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarModule]
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
