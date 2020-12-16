import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';
import { waitForVisible } from '../../helper/helper';

export class LinkPo extends BaseComponentPo {
    readonly url = '/link';
    readonly root = $('#page-content');
    readonly iconLink = $('fdp-platform-link-icon-example a');
    readonly standardLinks = $$('fdp-platform-link-standard-example a');
    readonly standardImgLink = $('fdp-platform-link-standard-example #img-link');
    readonly emphasizedLink = $('fdp-platform-link-emphasized-example a');
    readonly disabledLink = $('fdp-platform-link-disabled-example a');
    readonly emphasizedDisabledLink = $('fdp-platform-link-disabled-emphasized-example a');
    readonly invertedLink = $('fdp-platform-link-inverted-example a');
    readonly truncatedLink = $('fdp-platform-link-truncated-example a');
    readonly rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');
    readonly exampleAreaContainersArr = $$('.fd-doc-component');

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    }

}
