import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class PanelPo extends PlatformBaseComponentPo {
    url = '/panel';
    root = '#page-content';

    expandablePanelRoot = 'fdp-platform-panel-expandable-example ';
    expandablePanelBtn = this.expandablePanelRoot + 'button';
    expandablePanelTitle = this.expandablePanelRoot + 'h5';
    expandablePanelContent = this.expandablePanelRoot + '.fd-panel__content';

    fixedPanelSection = 'fdp-panel-fixed-example fd-panel';
    fixedPanelDescription = 'fdp-panel-fixed-example fdp-panel-content';

    compactPanelRoot = '#compact-panel-id';
    compactPanelBtn = this.compactPanelRoot + ' button';

    fixedHeightPanelRoot = 'fdp-panel-fixed-height-example #fixed-panel-id';
    fixedHeightPanelContentRegion = this.fixedHeightPanelRoot + ' [role="region"]';
    fixedHeightPanelContent = this.fixedHeightPanelRoot + ' fdp-panel-content';

    actionPanelRoot = '#panel-actions-id';
    actionPanelBtn = this.actionPanelRoot + ' button.fd-ellipsis';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'panel'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'panel'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
