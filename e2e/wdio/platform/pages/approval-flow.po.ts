import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ApprovalFlowPo extends BaseComponentPo {
    url = '/approval-flow';
    root = '#page-content';
    watchers = 'fdp-approval-flow .approval-flow__watchers';
    approvalFlow = 'fdp-approval-flow .approval-flow__container';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.watchers);
    }
}
