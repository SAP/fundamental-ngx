import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class ButtonPo extends CoreBaseComponentPo {
    private url = '/button';
    root = '#page-content';

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
    checkboxCompact = 'label[for="playgroundcompact"]';
    checkboxMenu = 'label[for="playgroundfdMenu"]';
    menuOption = this.dropDownMenu + ' option';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }

    dropDownOptionByValue(option: string): any {
        return `select.form-control.ng-valid option[value=${option}]`;
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
