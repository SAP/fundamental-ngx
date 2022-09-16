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

    options = (id): string => `#fd-option-${id}`;

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'select'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'select'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
