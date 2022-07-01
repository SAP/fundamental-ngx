import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDensityEnum } from '@fundamental-ngx/core/utils';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';

import { SortingComponent, SettingsSortDialogData } from './sorting.component';
import { PlatformTableModule } from '../../../table.module';
import { SortDirection } from '../../../enums';

describe('PlatformTableSortDialogComponent', () => {
    let component: SortingComponent;
    let fixture: ComponentFixture<SortingComponent>;
    const dialogRef = new DialogRef();
    const dialogData: SettingsSortDialogData = {
        columns: [],
        direction: SortDirection.NONE,
        field: null,
        tableContentDensity: ContentDensityEnum.COZY
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig],
            imports: [PlatformTableModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SortingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
