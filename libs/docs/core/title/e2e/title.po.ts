import { CoreBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class TitlePo extends CoreBaseComponentPo {
    private url = '/title';

    semanticExample = 'fd-title-semantic-example ';
    visualExample = 'fd-title-visual-example ';
    ellisionExample = 'fd-title-elision-example ';
    wrappingExample = 'fd-title-wrapping-example ';

    title = '.fd-title';
    paragraphsBlock = 'div';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
