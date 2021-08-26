import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core';
import { GroupingComponent, GroupDialogData } from './grouping.component';
import { PlatformTableModule } from '../../../table.module';

describe('PlatformTableGroupDialogComponent', () => {
    let component: GroupingComponent;
    let fixture: ComponentFixture<GroupingComponent>;
    const dialogRef = new DialogRef();
    const dialogData: GroupDialogData = { columns: [], direction: null, field: null };
    dialogRef.data = dialogData;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, NoopAnimationsModule],
                providers: [{ provide: DialogRef, useValue: dialogRef }, DialogService, DialogConfig]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
