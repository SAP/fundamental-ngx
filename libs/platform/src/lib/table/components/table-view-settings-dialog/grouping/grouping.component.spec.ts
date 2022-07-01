import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContentDensityEnum } from '@fundamental-ngx/core/utils';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { GroupingComponent, SettingsGroupDialogData } from './grouping.component';
import { PlatformTableModule } from '../../../table.module';
import { SortDirection } from '../../../enums';

describe('PlatformTableGroupDialogComponent', () => {
    let component: GroupingComponent;
    let fixture: ComponentFixture<GroupingComponent>;
    const dialogRef = new DialogRef();
    const dialogData: SettingsGroupDialogData = {
        columns: [],
        direction: SortDirection.NONE,
        field: null,
        tableContentDensity: ContentDensityEnum.COZY
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, NoopAnimationsModule],
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
