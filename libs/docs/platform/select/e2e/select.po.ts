import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SelectPo extends PlatformBaseComponentPo {
    url = '/select';

    selectModeExample = 'fdp-select-mode-example';
    displayText = ' .fd-select__control';
    select = ' fd-select';
    buttons = ' button';
    selectedValue_1 = 'fdp-select~small';
    selectWithTwoColumnsExample = 'fdp-select-columns-example';
    selectedValue_2 = 'fdp-select~p';
    selectSemanticStateExample = 'fdp-select-semantic-state-example';
    selectSemanticStateOption = '.fd-list__item.ng-star-inserted';
    customControlContentExample = 'fdp-select-custom-trigger';
    selectMobileExample = 'fdp-select-mobile-example';
    mobileCloseButton = 'fd-bar-element button';
    mobileTitle = '.fd-title--h5';
    selectMaxHeightExample = 'fdp-select-max-height-example';
    selectNoneExample = 'fdp-select-none-example';
    selectNowrapExample = 'fdp-select-nowrap-example';
    selectInReactiveForms = 'fdp-select-forms';
    inputControl = ' .fd-select__control';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'select'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'select'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
