import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsDialogComponent } from './settings-dialog.component';

describe('CombineComponent', () => {
    let component: SettingsDialogComponent;
    let fixture: ComponentFixture<SettingsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsDialogComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
