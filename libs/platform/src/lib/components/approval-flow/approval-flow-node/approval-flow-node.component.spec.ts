import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowNodeComponent } from './approval-flow-node.component';
import { ApprovalNode, PlatformApprovalFlowModule } from '@fundamental-ngx/platform';
import { ChangeDetectorRef } from '@angular/core';

const node: ApprovalNode = {
    id: 'ID1',
    name: 'node name',
    description: 'node description',
    approvers: [{
        id: 'uid66161',
        name: 'Jill Fuller',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/64.jpg'
    }],
    status: 'approved',
    targets: [],
    dueDate: new Date(),
    createDate: new Date()
};

describe('ApprovalFlowNodeComponent', () => {
    let component: ApprovalFlowNodeComponent;
    let fixture: ComponentFixture<ApprovalFlowNodeComponent>;
    let changeDetectorRef: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApprovalFlowNodeComponent],
            imports: [PlatformApprovalFlowModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalFlowNodeComponent);
        component = fixture.componentInstance;
        component.node = node;
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    function detectChangesOnPush(): void {
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add blank class', () => {
        component.blank = true;
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveClass('approval-flow-node--blank');
    });

    it('should add line-before class', () => {
        component.renderLineBefore = true;
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveClass('approval-flow-node--line-before');
    });

    it('should add line-after class', () => {
        component.renderLineAfter = true;
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveClass('approval-flow-node--line-after');
    });

    it('should render arrow when arrow option set to true',   () => {
        component.renderArrow = true;
        fixture.detectChanges();
        detectChangesOnPush();
        expect(fixture.nativeElement.querySelector('.approval-flow-node__arrow')).toBeTruthy();
    });

    it('should have approved class when node is approved', () => {
        component.node.status = 'approved';
        component.ngOnInit();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveClass('approval-flow-node--approved');
    });

    // TODO: Unskip after fix
    xit('should add parent-approved class if parent node is approved', () => {
        component.parent = Object.assign({ status: 'approved' }, node);
        component.ngOnInit();
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveClass('approval-flow-node--parent-approved');
    });

    it('should have positive object status when node is approved', () => {
        component.node.status = 'approved';
        component.ngOnInit();
        fixture.detectChanges();
        expect(component._objectStatus).toEqual('positive');
    });

    it('should have negative object status when node is rejected', () => {
        component.node.status = 'rejected';
        component.ngOnInit();
        fixture.detectChanges();
        expect(component._objectStatus).toEqual('negative');
    });
});
