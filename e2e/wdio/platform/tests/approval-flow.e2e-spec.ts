import { checkElement, refreshPage, saveElement, waitForPresent } from '../../driver/wdio';
import { ApprovalFlowPo } from '../pages/approval-flow.po';

describe('Approval flow', function() {
    const approvalFlowPage = new ApprovalFlowPo();

    beforeAll(() => {
        approvalFlowPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(approvalFlowPage.watchers);
    }, 1);









    xdescribe('Visual regression:', function() {
        xit('should save some screenshots ', () => {
            saveElement(approvalFlowPage.watchers, 'watchers');
            saveElement(approvalFlowPage.approvalFlow, 'approvalFlow');
        });

        it('should compare successful with a baseline watchers', () => {
            const aaa = checkElement(approvalFlowPage.watchers, 'watchers');
            expect(aaa).toEqual(0);
        });

        it('should compare successful with a baseline approvalFlow', () => {
            const aaa = checkElement(approvalFlowPage.approvalFlow, 'approvalFlow');
            expect(aaa).toEqual(0);
        });
    });
});
