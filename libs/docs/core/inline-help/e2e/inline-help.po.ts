import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class InlineHelpPo extends CoreBaseComponentPo {
    private url = '/inline-help';
    root = '#page-content';
    defaultInlineHelp = 'fd-inline-help-example span';
    inlineHelpIcons = 'fd-inline-help-example fd-icon';
    inlineHelpInput = 'fd-inline-help-example input';
    inlineHelpButton = 'fd-inline-help-trigger-example button';
    inlineHelpStyledIcon = 'fd-inline-help-styled-example fd-icon';
    inlineHelpTemplateExample = 'fd-inline-help-template-example span';
    inlineHelpExampleExtended = '.docs-tile';
    popover = 'div.fd-popover__popper';
    inlineHelp = '.fd-inline-help__content';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder('/inline-help');
    }

    async saveExampleBaselineScreenshot(specName: string = 'inline-help'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'inline-help'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
