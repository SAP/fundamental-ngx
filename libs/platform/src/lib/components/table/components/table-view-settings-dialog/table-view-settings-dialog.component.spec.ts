import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewSettingsDialogComponent } from './table-view-settings-dialog.component';

describe('TableViewSettingsDialogComponent', () => {
    let component: TableViewSettingsDialogComponent;
    let fixture: ComponentFixture<TableViewSettingsDialogComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TableViewSettingsDialogComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableViewSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
