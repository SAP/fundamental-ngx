import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TimelinePo extends CoreBaseComponentPo {
    private url = '/timeline';

    actionButton = '.fd-timeline__post .fd-button';
    showButton = '.fd-timeline__post .fd-link';
    timelinePost = '.fd-timeline__node-wrapper .fd-timeline__post';
    timelineNode = 'div.fd-timeline__node';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

}
