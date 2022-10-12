import { TimelinePo } from './timeline.po';
import { click, getElementArrayLength, getElementSize, checkElArrIsClickable } from '../../../../../e2e';

describe('Timeline test suite', () => {
    const timelinePage = new TimelinePo();
    const { actionButton, showButton, timelinePost, timelineNode } = timelinePage;

    beforeAll(async () => {
        await timelinePage.open();
    }, 1);

    it('should check all action buttons are clickable', async () => {
        await checkElArrIsClickable(actionButton);
    });

    it('should check each timeline post has a node', async () => {
        const nodeCount = await getElementArrayLength(timelineNode);
        const postCount = await getElementArrayLength(timelinePost);

        await expect(postCount).toEqual(nodeCount);
    });

    it('should check more button expands section and less button collapses section', async () => {
        const postStartingHeight = await (await getElementSize(timelinePost, 5)).height;

        await click(showButton);
        const postExpandedHeight = await (await getElementSize(timelinePost, 5)).height;
        await click(showButton);
        const postCollapsedHeight = await (await getElementSize(timelinePost, 5)).height;

        await expect(postStartingHeight).toBeLessThan(postExpandedHeight);
        await expect(postCollapsedHeight).toBeLessThan(postExpandedHeight);
    });

    it('should check RTL mode', async () => {
        await timelinePage.checkRtlSwitch();
    });
});
