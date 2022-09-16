import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TextPo extends CoreBaseComponentPo {
    url = '/text';
    root = '#page-content';
    contentPage = '#page-content';
    linksExpandable = 'a.fd-link';
    textParagraph = '.fd-text__lineclamp';
    textExpandableExample = 'fd-text-expandable ';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'text-component'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'text-component'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
