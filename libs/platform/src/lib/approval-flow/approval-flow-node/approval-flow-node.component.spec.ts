import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowNodeComponent } from './approval-flow-node.component';
import { ApprovalNode } from '../interfaces';
import { PlatformApprovalFlowModule } from '../approval-flow.module';

const node: ApprovalNode = {
    id: 'ID1',
    name: 'node name',
    description: 'node description',
    approvers: [
        {
            id: 'uid66161',
            name: 'Jill Fuller',
            teamId: 'teamId1',
            description: 'Accounting team',
            imgUrl: 'https://randomuser.me/api/portraits/women/64.jpg'
        }
    ],
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
        component.node = {
            ...component.node,
            blank: true
        };

        fixture.detectChanges();
        detectChangesOnPush();

        expect(fixture.nativeElement).toHaveClass('fdp-approval-flow-node--blank');
    });

    it('should toggle line-before & line-after classes', () => {
        fixture.detectChanges();
        detectChangesOnPush();

        expect(fixture.nativeElement).toHaveClass('fdp-approval-flow-node--line-before');
        expect(fixture.nativeElement).toHaveClass('fdp-approval-flow-node--line-after');

        component.node = {
            ...component.node,
            blank: true
        };

        fixture.detectChanges();
        detectChangesOnPush();

        expect(fixture.nativeElement).not.toHaveClass('fdp-approval-flow-node--line-before');
        expect(fixture.nativeElement).not.toHaveClass('fdp-approval-flow-node--line-after');
    });

    it('should render arrow when arrow option set to true', () => {
        component.renderArrow = true;

        fixture.detectChanges();
        detectChangesOnPush();

        expect(fixture.nativeElement.querySelector('.fdp-approval-flow-node__arrow')).toBeTruthy();
    });

    it('should have approved class when node is approved', () => {
        component.node = {
            ...component.node,
            status: 'approved'
        };

        fixture.detectChanges();
        detectChangesOnPush();

        expect(fixture.nativeElement).toHaveClass('fdp-approval-flow-node--approved');
    });

    it('should add parent-approved class if parent node is approved', () => {
        component.meta = {
            parents: [{ ...node, status: 'approved' }],
            isRoot: false,
            isFinal: false,
            parallelStart: false,
            parallelEnd: false
        };

        fixture.detectChanges();
        detectChangesOnPush();

        expect(fixture.nativeElement).toHaveClass('fdp-approval-flow-node--parent-approved');
    });

    it('should have positive object status when node is approved', () => {
        component.node = {
            ...component.node,
            status: 'approved'
        };

        fixture.detectChanges();
        detectChangesOnPush();

        expect(component._objectStatus).toEqual('positive');
    });

    it('should have negative object status when node is rejected', () => {
        component.node = {
            ...component.node,
            status: 'rejected'
        };

        component.ngOnInit();
        fixture.detectChanges();
        detectChangesOnPush();

        expect(component._objectStatus).toEqual('negative');
    });
});
