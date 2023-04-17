import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShellbarComponent, ShellbarGroupFlexOptions } from '../shellbar.component';
import { ShellbarModule } from '../shellbar.module';
import { ShellbarActionsComponent } from './shellbar-actions.component';

export class ShellbarMock {
    groupFlex: ShellbarGroupFlexOptions = {
        actions: {
            shrink: true,
            flexBasisAuto: true
        }
    };
}

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarModule],
            providers: [
                {
                    provide: ShellbarComponent,
                    useClass: ShellbarMock
                }
            ]
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

    it('should apply modifier classes', async () => {
        await fixture.whenRenderingDone();

        expect(fixture.debugElement.nativeElement.classList).toContain('fd-shellbar__group--shrink');
        expect(fixture.debugElement.nativeElement.classList).toContain('fd-shellbar__group--basis-auto');
    });
});
