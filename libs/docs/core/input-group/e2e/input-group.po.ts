import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class InputGroupPo extends CoreBaseComponentPo {
    url = '/input-group';

    inputFields = '.fd-input-group__input';
    inputGroup = '.fd-input-group ';
    inputGroupSearchText = 'fd-input-group~small';
    inputButtons = 'component-example .fd-input-group__button:not(.is-disabled)';
    playgroundCheckbox = '.fd-checkbox__label';
    playgroundInputField = '.fd-input.form-control';
    rightTextAddon = '.fd-playground__content span';
    playgroundInputButton = '.fd-playground__content button';
    iconExample = 'fd-input-group-icon-example ';
    icon = this.inputGroup + '[class*="sap-icon"]';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'input-group'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'input-group'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
