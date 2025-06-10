import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class SelectPo extends PlatformBaseComponentPo {
    url = '/select';

    selectModeExample = 'fdp-platform-select-mode-example';
    displayText = ' .fd-select__control';
    select = ' fd-select';
    buttons = ' button';
    selectedValue_1 = 'fdp-select~small';
    selectWithTwoColumnsExample = 'fdp-platform-select-columns-example';
    selectedValue_2 = 'fdp-select~p';
    selectSemanticStateExample = 'fdp-platform-select-semantic-state-example';

    selectSemanticStateOption = '.fd-list__item.ng-star-inserted';

    customControlContentExample = 'fdp-platform-select-custom-trigger';
    selectMobileExample = 'fdp-platform-select-mobile-example';
    mobileCloseButton = 'fd-bar-element button';
    mobileTitle = '.fd-title--h5';
    selectMaxHeightExample = 'fdp-platform-select-max-height-example';
    selectNoneExample = 'fdp-platform-select-none-example';
    selectNowrapExample = 'fdp-platform-select-nowrap-example';
    selectInReactiveForms = 'fdp-platform-select-forms';
    inputControl = ' .fd-select__control';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
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
