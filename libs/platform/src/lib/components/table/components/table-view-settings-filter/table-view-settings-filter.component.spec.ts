import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';

describe('TableViewSettingsFilterComponent', () => {
    let component: TableViewSettingsFilterComponent;
    let fixture: ComponentFixture<TableViewSettingsFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableViewSettingsFilterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableViewSettingsFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
