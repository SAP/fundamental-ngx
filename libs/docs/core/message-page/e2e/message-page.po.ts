import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MessagePagePo extends CoreBaseComponentPo {
    private url = '/message-page';

    examples = '.fd-doc-component';
    icons = '.fd-message-page__icon';
    messagePage = '.fd-message-page ';
    content = this.messagePage + '.fd-message-page__content';
    contentTitle = this.messagePage + '.fd-message-page__title';
    contentSubTitle = this.messagePage + '.fd-message-page__subtitle';
    contentButton = this.messagePage + '.fd-button';
    contentLink = this.messagePage + '.fd-link';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
