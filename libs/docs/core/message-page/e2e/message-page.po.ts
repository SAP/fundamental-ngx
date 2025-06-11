import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class MessagePagePo extends CoreBaseComponentPo {
    examples = '.fd-doc-component';
    icons = '.fd-message-page__icon';
    messagePage = '.fd-message-page ';
    content = this.messagePage + '.fd-message-page__content';
    contentTitle = this.messagePage + '.fd-message-page__title';
    contentSubTitle = this.messagePage + '.fd-message-page__subtitle';
    contentButton = this.messagePage + '.fd-button';
    contentLink = this.messagePage + '.fd-link';

    private url = '/message-page';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
