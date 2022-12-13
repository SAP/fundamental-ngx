import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShellbarModule } from '../shellbar.module';
import { ShellbarActionsComponent } from './shellbar-actions.component';

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
