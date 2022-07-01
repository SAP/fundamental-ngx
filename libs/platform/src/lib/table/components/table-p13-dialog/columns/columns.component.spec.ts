import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RtlService, ContentDensityEnum } from '@fundamental-ngx/core/utils';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { PlatformTableModule } from '../../../table.module';
import { P13ColumnsDialogComponent, ColumnsDialogData } from './columns.component';

describe('PlatformTableP13ColumnsDialogComponent', () => {
    let component: P13ColumnsDialogComponent;
    let fixture: ComponentFixture<P13ColumnsDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: ColumnsDialogData = {
        availableColumns: [],
        visibleColumns: [],
        tableContentDensity: ContentDensityEnum.COZY
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig, RtlService],
            imports: [PlatformTableModule, NoopAnimationsModule]
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
