import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FormattedTextPo extends CoreBaseComponentPo {
    private url = '/formatted-text';
    convertedLinks = 'fd-formatted-text a';
    redListItem = 'fd-formatted-text ol li';

    inputHtmlText = 'fd-formatted-text-example div';
    secondInputHtmlText = 'fd-formatted-text-links-example div';

    open(): void {
        super.open(this.url);
        waitForPresent(this.inputHtmlText);
        waitForElDisplayed(this.inputHtmlText);
    }
}
