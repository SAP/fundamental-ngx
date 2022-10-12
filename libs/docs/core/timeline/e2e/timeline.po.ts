import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TimelinePo extends CoreBaseComponentPo {
    private url = '/timeline';

    actionButton = '.fd-timeline__post .fd-button';
    showButton = '.fd-timeline__post .fd-link';
    timelinePost = '.fd-timeline__node-wrapper .fd-timeline__post';
    timelineNode = 'div.fd-timeline__node';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
