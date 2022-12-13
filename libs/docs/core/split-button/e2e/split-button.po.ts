import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SplitButtonPo extends CoreBaseComponentPo {
    private url = '/split-button';

    buttonBehaviorExample = 'fd-split-button-behaviors-example ';
    iconBehaviorExample = 'fd-split-button-icons-example ';
    buttonTypesExample = 'fd-split-button-types-example ';
    buttonPragmaticalExample = 'fd-split-button-programmatical-example ';
    buttonTemplateExample = 'fd-split-button-template-example ';

    mainBtn = '.fd-button__text';
    arrowDownBtn = 'fd-split-button .fd-button:nth-of-type(2)';
    button = '.fd-button';
    splitMenu = 'div.fd-popover__body';
    splitMenuItem = '.fd-menu__list li';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'split-button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'split-button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
