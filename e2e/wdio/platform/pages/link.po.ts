import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class LinkPo extends BaseComponentPo {
    readonly url = '/link';
    readonly root = '#page-content';
    readonly iconLink = 'fdp-platform-link-icon-example a';
    readonly standardLinks = 'fdp-platform-link-standard-example a';
    readonly emphasizedLink = 'fdp-platform-link-emphasized-example a';
    readonly disabledLink = 'fdp-platform-link-disabled-example a';
    readonly emphasizedDisabledLink = 'fdp-platform-link-disabled-emphasized-example a';
    readonly invertedLink = 'fdp-platform-link-inverted-example a';
    readonly truncatedLink = 'fdp-platform-link-truncated-example a';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.iconLink);
    }

}
