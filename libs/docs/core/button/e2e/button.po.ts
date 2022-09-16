// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    dropDownOptionByValue(option: string): any {
        return `select.form-control.ng-valid option[value=${option}]`;
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
