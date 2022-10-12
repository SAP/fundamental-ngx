import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class PanelPo extends CoreBaseComponentPo {
    private url = '/panel';
    root = '#page-content';

    toggleButton = '.docs-button';
    panelExpandableButton = 'fd-panel-expandable-example fd-panel button';
    panelParagraphs = '.fd-panel__content';
    expandableButton = '.fd-panel__button';
    compactPanelButton = 'fd-panel-compact-example button';
    panelTitle = 'h5.fd-panel__title';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'panel'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'panel'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
