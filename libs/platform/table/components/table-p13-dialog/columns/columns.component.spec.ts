import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { ColumnsDialogData, P13ColumnsDialogComponent } from './columns.component';

describe('PlatformTableP13ColumnsDialogComponent', () => {
    let component: P13ColumnsDialogComponent;
    let fixture: ComponentFixture<P13ColumnsDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: ColumnsDialogData = {
        availableColumns: [],
        visibleColumns: []
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig, RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(P13ColumnsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
