import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SwitchPo extends CoreBaseComponentPo {
    private url = '/switch';

    switchSizesExample = 'fd-switch-sizes-example ';
    disabledSwitchExample = 'fd-disabled-switch-example ';
    switchBindingExample = 'fd-switch-binding-example ';
    semanticswitchExample = 'fd-semantic-switch-example ';
    switchFormsExample = 'fd-switch-forms-example ';
    playGroundSwitchExample = '.fd-playground__row ';

    toggle = '.fd-switch';
    toggleInput = '.fd-switch__input';
    disabledToggle = 'fd-switch is-disabled';
    disabledAndCompactToggle = 'fd-switch fd-switch--compact is-disabled';
    switchSizes = this.switchSizesExample + this.toggle;
    disabledSwitch = this.disabledSwitchExample + this.toggle;
    bindSwitch = this.switchBindingExample + this.toggle;
    semanticSwitch = this.semanticswitchExample + this.toggle;
    switchformSwtich = this.switchFormsExample + this.toggle;
    playGroundSwitch = this.playGroundSwitchExample + this.toggle;
    checkboxes = '.fd-checkbox__label';

    declineIcon = this.semanticswitchExample + '.sap-icon--decline';
    acceptIcon = this.semanticswitchExample + '.sap-icon--accept';
    switchBtn = this.switchBindingExample + '.fd-button--standard';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'switch'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'switch'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
