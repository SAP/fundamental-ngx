import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderCellContentComponent } from './table-header-cell-content.component';

describe('TableHeaderCellContentComponent', () => {
    let component: TableHeaderCellContentComponent;
    let fixture: ComponentFixture<TableHeaderCellContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableHeaderCellContentComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TableHeaderCellContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
