import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';
import { ContentDensityEnum } from '@fundamental-ngx/core/utils';

import { PlatformTableModule } from '../../../table.module';
import { GroupDialogData, P13GroupingDialogComponent } from './grouping.component';

describe('PlatformTableP13GroupDialogComponent', () => {
    let component: P13GroupingDialogComponent;
    let fixture: ComponentFixture<P13GroupingDialogComponent>;
    const dialogRef = new DialogRef();
    const dialogData: GroupDialogData = {
        columns: [],
        collectionGroup: [],
        tableContentDensity: ContentDensityEnum.COZY
    };
    dialogRef.data = dialogData;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule, BrowserAnimationsModule],
            providers: [{ provide: DialogRef, useValue: dialogRef }, DialogConfig]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(P13GroupingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
