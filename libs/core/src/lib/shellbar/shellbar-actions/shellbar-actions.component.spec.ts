import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShellbarModule } from '../shellbar.module';
import { ShellbarActionsComponent } from './shellbar-actions.component';
import { ShellbarGroupFlexOptions } from '../model/shellbar-sizes';
import { FD_SHELLBAR_COMPONENT } from '../tokens';

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
                    provide: FD_SHELLBAR_COMPONENT,
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
