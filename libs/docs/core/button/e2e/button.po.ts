// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ButtonPo extends CoreBaseComponentPo {
    private url = '/button';

    typeButtons = 'fd-button-types-example button';
    menuButtons = 'fd-button-menu-example button';
    sizeButtons = 'fd-button-sizes-example button';
    iconButtons = 'fd-button-icons-example button';
    stateButton = 'fd-button-state-example button:nth-child(1)';
    disableStateButtons = 'fd-button-state-example button.is-disabled';
    playgroundButton = 'playground button';
    playgroundButtonText = 'playground .fd-button__text';
    playgroundButtonIcon = this.playgroundButton + ' fd-icon';
    inputLabel = '.fd-input.form-control';
    dropDownMenu = 'select.form-control.ng-valid';
    checkboxCompact = '#playgroundcompact~label';
    checkboxMenu = '#playgroundfdMenu~label';
    menuOption = this.dropDownMenu + ' option';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    dropDownOptionByValue(option: string): string {
        return `select.form-control.ng-valid option[value=${option}]`;
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
