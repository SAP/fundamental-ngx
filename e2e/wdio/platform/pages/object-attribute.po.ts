import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ObjectAttributePo extends BaseComponentPo {
    url = '/object-attribute';
    root = '#page-content';

    textExample = 'fdp-object-attribute-example ';
    linkExample = 'fdp-platform-object-attribute-link-example ';

    objectAttribute = '.fd-object-attribute';
    objectLinkAttribute = '.fd-object-attribute--link';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
