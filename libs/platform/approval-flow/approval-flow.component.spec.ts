import { RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { ApprovalFlowComponent } from '../approval-flow/approval-flow.component';
import { PlatformApprovalFlowModule } from '../approval-flow/approval-flow.module';

import {
    ApprovalFlowTeamDataSource,
    ApprovalFlowUserDataSource,
    createKeyboardEvent
} from '@fundamental-ngx/platform/shared';
import {
    APPROVAL_FLOW_NODE_TYPES,
    AddNodeDialogRefData
} from './approval-flow-add-node/approval-flow-add-node.component';
import { ApprovalGraphNode } from './interfaces';
import { simpleGraph, users } from './tests/data';
import { TeamDataProvider, UserDataProvider } from './tests/providers';

const TEST_APPROVAL_FLOW_TITLE = 'Test title';

@Component({
    selector: 'fdp-test-approval-flow',
    template: ` <fdp-approval-flow
        #approvalFlowComponent
        [title]="title"
        [value]="value"
        [userDataSource]="userDataSource"
        [watcherDataSource]="watcherDataSource"
        [teamDataSource]="teamDataSource"
    ></fdp-approval-flow>`,
    standalone: true,
    imports: [PlatformApprovalFlowModule]
})
class TestPlatformApprovalFlowComponent {
    @ViewChild('approvalFlowComponent', { static: true }) component: ApprovalFlowComponent;
    title = TEST_APPROVAL_FLOW_TITLE;
    value = simpleGraph;
    userDataSource = new ApprovalFlowUserDataSource(new UserDataProvider());
    watcherDataSource = new ApprovalFlowUserDataSource(new UserDataProvider());
    teamDataSource = new ApprovalFlowTeamDataSource(new TeamDataProvider());
}

describe('ApprovalFlowComponent', () => {
    let fixture: ComponentFixture<TestPlatformApprovalFlowComponent>;
    let component: ApprovalFlowComponent;
    let host: TestPlatformApprovalFlowComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestPlatformApprovalFlowComponent, NoopAnimationsModule],
            providers: [RtlService]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestPlatformApprovalFlowComponent);
        host = fixture.componentInstance;
        component = host.component;
        jest.spyOn(component, '_setScrollPosition').mockImplementation((pos) => {
            component._graphContainerEl.nativeElement.scrollLeft = pos;
        });
        await fixture.whenRenderingDone();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should properly set node flags (nodes metadata)', () => {
        const simpleGraphRootNode = component._graph.columns[0].nodes[0];
        const graphLastColumnIndex = component._graph.columns.length - 1;
        const simpleGraphFinalNode = component._graph.columns[graphLastColumnIndex].nodes[0];

        expect(component._graphMetadata[simpleGraphRootNode.id].isRoot).toBeTruthy();
        expect(component._graphMetadata[simpleGraphFinalNode.id].isFinal).toBeTruthy();

        expect(component._graphMetadata[simpleGraphRootNode.id].canAddNodeBefore).toBeFalsy();
        expect(component._graphMetadata[simpleGraphRootNode.id].canAddNodeAfter).toBeFalsy();
        expect(component._graphMetadata[simpleGraphRootNode.id].canAddParallel).toBeFalsy();

        expect(component._graphMetadata[simpleGraphFinalNode.id].canAddNodeBefore).toBeTruthy();
        expect(component._graphMetadata[simpleGraphFinalNode.id].canAddNodeAfter).toBeTruthy();
        expect(component._graphMetadata[simpleGraphFinalNode.id].canAddParallel).toBeTruthy();
    });

    it('should render approval flow title', () => {
        const titleEl = fixture.nativeElement.querySelector('.fdp-approval-flow__toolbar .fd-toolbar .fd-label');

        expect(titleEl).toBeTruthy();
        expect(titleEl.textContent.trim()).toEqual(TEST_APPROVAL_FLOW_TITLE);

        const newTitle = `${TEST_APPROVAL_FLOW_TITLE}-changed`;

        host.title = newTitle;
        fixture.detectChanges();

        expect(titleEl.textContent.trim()).toEqual(newTitle);
    });

    it('should render watchers list', () => {
        const watchersContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__watchers');

        expect(watchersContainer).toBeTruthy();
        expect(watchersContainer.querySelectorAll('fd-avatar').length).toEqual(simpleGraph.watchers.length);
    });

    it('should call watcher click handler on watcher click', () => {
        jest.spyOn(component, '_onWatcherClick');

        const watchersContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__watchers');
        const watcher = watchersContainer.querySelector('fd-avatar');

        expect(watcher).toBeTruthy();

        watcher.click();

        expect(component._onWatcherClick).toHaveBeenCalled();
    });

    it('should render graph', () => {
        const nodesContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__graph');

        expect(nodesContainer).toBeTruthy();
        expect(nodesContainer.querySelectorAll('.fdp-approval-flow__graph-column').length).toEqual(
            simpleGraph.nodes.length
        );
        expect(nodesContainer.querySelectorAll('fdp-approval-flow-node').length).toEqual(simpleGraph.nodes.length);
    });

    it('should call keydown handler if arrow key was pressed', () => {
        jest.spyOn(component, '_onNodeKeyDown');

        const nodesContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__graph');

        expect(nodesContainer).toBeTruthy();

        const nodes = nodesContainer.querySelectorAll('fdp-approval-flow-node');
        const firstNode = nodes[0];

        firstNode.focus();

        const keyboardEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');

        firstNode.dispatchEvent(keyboardEvent);

        expect(component._onNodeKeyDown).toHaveBeenCalled();
    });

    it('should increment step count after nextSlide call', async () => {
        component._graphContainerEl.nativeElement.scrollLeft = 0;
        jest.spyOn(component._graphEl.nativeElement, 'scrollWidth', 'get').mockReturnValue(20000);
        const prevCountRight = component._carouselStepsRight;

        component.nextSlide();

        expect(prevCountRight > component._carouselStepsRight).toBeTruthy();
    });

    it('should decrement step count after previousSlide call', async () => {
        component._graphContainerEl.nativeElement.scrollLeft = 0;
        jest.spyOn(component._graphEl.nativeElement, 'scrollWidth', 'get').mockReturnValue(20000);
        expect(component._carouselStepsLeft).toBe(0);

        // scroll as far to the right as we can
        component._setScrollPosition(10000);
        component._graphContainerEl.nativeElement.scrollLeft = 10000;

        const prevCountLeft = component._carouselStepsLeft;
        expect(prevCountLeft).not.toBe(0);

        component.nextSlide(-1);
        expect(prevCountLeft > component._carouselStepsLeft).toBeTruthy();
    });

    it('should open adding node dialog for the empty graph', () => {
        const dialogSpy = jest.spyOn(fixture.componentRef.injector.get(DialogService), 'open').mockReturnValue({
            afterClosed: of(null)
        } as any);

        component._addNode({} as ApprovalGraphNode, 'empty');

        expect(dialogSpy).toHaveBeenCalled();

        const lastCall = dialogSpy.mock.lastCall!;

        const diagogSpyArgs = lastCall[1]!.data as AddNodeDialogRefData;

        expect(diagogSpyArgs.nodeTarget).toEqual('empty');
        expect(diagogSpyArgs.showNodeTypeSelect).toEqual(false);
    });

    it('should enter edit mode', fakeAsync(() => {
        const watchersSpy = jest.spyOn(component.watcherDataSource, 'match');

        component._enterEditMode();

        expect(watchersSpy).toHaveBeenCalled();
        tick(600); // get watchers request is delayed for 500ms
        expect(component._usersForWatchersList).toEqual(users);
        expect(component._isEditMode).toBeTruthy();
    }));

    it('should save edit mode changes', () => {
        const approvalSpy = jest.spyOn(component.valueChange, 'emit');

        component._saveEditModeChanges();

        expect(approvalSpy).toHaveBeenCalled();
        expect(component._isEditMode).toBeFalsy();
    });

    it('should exit edit mode', () => {
        component._exitEditMode();

        expect(component._isEditMode).toBeFalsy();
    });

    it('should add node to the graph', () => {
        const dialogSpy = jest.spyOn(TestBed.inject(DialogService), 'open').mockReturnValue({
            afterClosed: of({
                node: Object.assign({}, simpleGraph.nodes[0], { status: 'not started' }),
                nodeType: APPROVAL_FLOW_NODE_TYPES.SERIAL
            })
        } as any);

        const lastNodeComponent = component._nodeComponents.last;
        const sourceNode = lastNodeComponent.node;

        component._addNode(sourceNode, 'after');

        expect(dialogSpy).toHaveBeenCalled();

        const addedNodeIndex = component._approvalProcess.nodes.length - 1;
        const addedNodeId = component._approvalProcess.nodes[addedNodeIndex].id;

        expect(addedNodeId.startsWith('tempId')).toBeTruthy();
        expect(sourceNode.targets[0]).toEqual(addedNodeId);
    });
});
