import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';

import { PlatformApprovalFlowModule } from '../approval-flow.module';
import { ApprovalFlowSelectTypeComponent } from './approval-flow-select-type.component';

describe('ApprovalFlowSelectTypeComponent', () => {
    let component: ApprovalFlowSelectTypeComponent;
    let fixture: ComponentFixture<ApprovalFlowSelectTypeComponent>;

    const dialogRef = new DialogRef();
    const dialogConfig = new DialogConfig();
    dialogRef.data = { rtl: false };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule, NoopAnimationsModule],
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
});
