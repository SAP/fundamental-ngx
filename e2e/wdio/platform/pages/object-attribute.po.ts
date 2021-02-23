import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ObjectAttributePo extends BaseComponentPo {
    url = '/object-attribute';
    root = '#page-content';

    standaloneTextObject = 'fdp-object-attribute-example .fd-object-attribute';
    linkObject = 'fdp-platform-object-attribute-link-example .fd-object-attribute';
    externalLinkObject = 'fdp-platform-object-attribute-link-example .fd-object-attribute--link';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
