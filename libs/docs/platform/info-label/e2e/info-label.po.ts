import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class InfoLabelPO extends PlatformBaseComponentPo {
    url = '/info-label';
    readonly root = '#page-content';

    defaultLabel = 'fdp-platform-info-label-example span';
    labelsWithTextArr = 'fdp-platform-info-label-text-example fd-info-label';
    labelsWithTextAndIconArr = 'fdp-platform-info-label-text-icon-example fdp-info-label';
    labelsIconArr = 'fdp-platform-info-label-text-icon-example span i';
    labelsWithNumberOrIconArr = 'fdp-platform-info-label-numeric-icon-example fdp-info-label';
    accessibilityLabelsArr = 'fdp-platform-info-label-aria-label-example span';
    accessibilityAttrArr = 'fdp-platform-info-label-aria-label-example fd-info-label';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'info-label'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'info-label'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
