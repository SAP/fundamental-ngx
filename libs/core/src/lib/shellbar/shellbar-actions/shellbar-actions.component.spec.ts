import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarActionsComponent, ShellbarModule } from '@fundamental-ngx/core/shellbar';

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarModule]
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
