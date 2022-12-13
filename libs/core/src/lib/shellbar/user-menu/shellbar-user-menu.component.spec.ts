import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShellbarModule } from '../shellbar.module';
import { ShellbarUserMenuComponent } from './shellbar-user-menu.component';

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
