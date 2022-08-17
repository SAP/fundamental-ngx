import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogModule } from '@fundamental-ngx/core/dialog';
import { TableP13DialogComponent } from './table-p13-dialog.component';

describe('TableP13DialogComponent', () => {
    let component: TableP13DialogComponent;
    let fixture: ComponentFixture<TableP13DialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogModule],
            declarations: [TableP13DialogComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableP13DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
