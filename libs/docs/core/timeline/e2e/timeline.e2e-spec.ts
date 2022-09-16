import { TimelinePo } from './timeline.po';
import { click, getElementArrayLength, getElementSize, checkElArrIsClickable } from '../../../../../e2e';

describe('Timeline test suite', () => {
    const timelinePage = new TimelinePo();
    const { actionButton, showButton, timelinePost, timelineNode } = timelinePage;

    beforeAll(() => {
        timelinePage.open();
    }, 1);

    it('should check all action buttons are clickable', () => {
        checkElArrIsClickable(actionButton);
    });

    it('should check each timeline post has a node', () => {
        const nodeCount = getElementArrayLength(timelineNode);
        const postCount = getElementArrayLength(timelinePost);

        expect(postCount).toEqual(nodeCount);
    });

    it('should check more button expands section and less button collapses section', () => {
        const postStartingHeight = getElementSize(timelinePost, 5, 'height');

        click(showButton);
        const postExpandedHeight = getElementSize(timelinePost, 5, 'height');
        click(showButton);
        const postCollapsedHeight = getElementSize(timelinePost, 5, 'height');

        expect(postStartingHeight).toBeLessThan(postExpandedHeight);
        expect(postCollapsedHeight).toBeLessThan(postExpandedHeight);
    });

    it('should check RTL mode', () => {
        timelinePage.checkRtlSwitch();
    });
});
