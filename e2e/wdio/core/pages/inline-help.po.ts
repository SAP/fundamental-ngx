import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.defaultInlineHelp);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder('/inline-help');
    }

    saveExampleBaselineScreenshot(specName: string = 'inline-help'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'inline-help'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
