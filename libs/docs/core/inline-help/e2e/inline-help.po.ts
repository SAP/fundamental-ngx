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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder('/inline-help');
    }

    saveExampleBaselineScreenshot(specName: string = 'inline-help'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'inline-help'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
