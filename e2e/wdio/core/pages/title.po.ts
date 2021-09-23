import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TitlePo extends CoreBaseComponentPo {
    private url = '/title';

    semanticExample = 'fd-title-semantic-example ';
    visualExample = 'fd-title-visual-example ';
    ellisionExample = 'fd-title-elision-example ';
    wrappingExample = 'fd-title-wrapping-example ';

    title = '.fd-title';
    paragraphsBlock = 'div';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
