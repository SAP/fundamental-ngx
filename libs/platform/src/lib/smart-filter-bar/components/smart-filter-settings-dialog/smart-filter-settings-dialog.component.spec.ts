import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFilterSettingsDialogComponent } from './smart-filter-settings-dialog.component';

describe('SmartFilterSettingsDialogComponent', () => {
    let component: SmartFilterSettingsDialogComponent;
    let fixture: ComponentFixture<SmartFilterSettingsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SmartFilterSettingsDialogComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmartFilterSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
