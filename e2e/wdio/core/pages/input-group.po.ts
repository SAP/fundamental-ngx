import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class InputGroupPo extends CoreBaseComponentPo {
    url = '/input-group';

    inputFields = '.fd-input-group__input';
    inputGroupSearchText = 'fd-input-group~small';
    inputButtons = 'component-example .fd-input-group__button:not(.is-disabled)';
    playgroundCheckbox = '.fd-checkbox__label';
    playgroundInputField = '.fd-input.form-control';
    rightTextAddon = '.fd-playground__content span';
    playgroundInputButton = '.fd-playground__content button';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'input-group'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'input-group'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
