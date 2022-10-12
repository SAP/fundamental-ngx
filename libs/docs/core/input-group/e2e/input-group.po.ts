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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'input-group'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'input-group'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
