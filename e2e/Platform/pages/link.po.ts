import { BaseComponent } from './base.component';
import { $, $$, browser } from 'protractor';


export class LinkPo extends BaseComponent {
    readonly linkUrl = 'platform/link';
    readonly iconLink = $('fdp-platform-link-icon-example fdp-link a');
    readonly standardLinks = $$('fdp-platform-link-standard-example fdp-link a');
    readonly standardImgLink = $('fdp-platform-link-standard-example fdp-link #img-link');
    readonly emphasizedLink = $('fdp-platform-link-emphasized-example fdp-link a');
    readonly disabledLink = $('fdp-platform-link-disabled-example fdp-link a');
    readonly emphasizedDisabledLink = $('fdp-platform-link-disabled-emphasized-example fdp-link a');
    readonly invertedLink = $('fdp-platform-link-inverted-example fdp-link a');
    readonly truncatedLink = $('fdp-platform-link-truncated-example fdp-link a');
    readonly rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');
    readonly exampleAreaContainersArr = $$('.fd-doc-component');

    async open(): Promise<void> {
        await super.open(this.linkUrl)
    }

    async checkLinkHover(variable) {
        return await expect(variable).toContain('underline solid')
    }

    async checkLinkNavigation(element, site: string) {
        browser.waitForAngularEnabled(false);
        await element.click();
        expect(await browser.getCurrentUrl()).toContain(site);
    }

}
