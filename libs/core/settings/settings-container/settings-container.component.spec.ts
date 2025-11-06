import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { whenStable } from '@fundamental-ngx/core/tests';
import { SettingsContainerComponent } from './settings-container.component';

describe('SettingsContainerComponent', () => {
    let component: SettingsContainerComponent;
    let fixture: ComponentFixture<SettingsContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SettingsContainerComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply proper css classes', async () => {
        await whenStable(fixture);

        expect(fixture.nativeElement.classList.contains('fd-settings__container')).toBe(true);
    });
});
