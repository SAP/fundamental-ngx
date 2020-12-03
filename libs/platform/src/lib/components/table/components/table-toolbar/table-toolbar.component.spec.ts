import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToolbarComponent } from './table-toolbar.component';

describe('TableToolbarComponent', () => {
    let component: TableToolbarComponent;
    let fixture: ComponentFixture<TableToolbarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TableToolbarComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
