import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FormattedTextPo extends CoreBaseComponentPo {
    private url = '/formatted-text';
    root = '#page-content';
    paragraphWithLink = 'fd-formatted-text p a';

    outputTitle = 'h1';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.root);
    }
}
