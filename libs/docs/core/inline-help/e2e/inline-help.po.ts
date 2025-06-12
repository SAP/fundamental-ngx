import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class InlineHelpPo extends CoreBaseComponentPo {
    root = '#page-content';
    defaultInlineHelp = 'fd-inline-help-example span';
    inlineHelpIcons = 'fd-inline-help-example fd-icon';
    inlineHelpInput = 'fd-inline-help-example input';
    inlineHelpButton = 'fd-inline-help-trigger-example button';
    inlineHelpStyledIcon = 'fd-inline-help-styled-example fd-icon';
    inlineHelpTemplateExample = 'fd-inline-help-template-example span';
    inlineHelpExampleExtended = '.docs-tile';
    popover = 'div.fd-popover__body';
    inlineHelp = '.fd-inline-help__content';

    private url = '/inline-help';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
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
