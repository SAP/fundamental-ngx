import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';

import { PlatformApprovalFlowModule } from '../approval-flow.module';
import { ApprovalFlowSelectTypeComponent } from './approval-flow-select-type.component';

describe('ApprovalFlowSelectTypeComponent', () => {
    let component: ApprovalFlowSelectTypeComponent;
    let fixture: ComponentFixture<ApprovalFlowSelectTypeComponent>;

    const dialogRef = new DialogRef();
    const dialogConfig = new DialogConfig();
    dialogRef.data = {  rtl: false };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApprovalFlowSelectTypeComponent],
            imports: [
                FdDatetimeModule,
                PlatformApprovalFlowModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: DialogConfig, useValue: dialogConfig }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalFlowSelectTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init dialog with passed data', () => {
        expect(component._data.rtl).toEqual(false);
    });
});
