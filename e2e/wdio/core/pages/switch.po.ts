import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent, getElementArrayLength } from '../../driver/wdio';
import { buttonPlaygroundTag } from '../fixtures/testData/button-tags';

export class switchPo extends CoreBaseComponentPo {
    private url = '/switch';

    root = '#page-content';

    switchSizesExample = 'fd-switch-sizes-example '
    disabledSwitchExample = 'fd-disabled-switch-example '
    switchBindingExample = 'fd-switch-binding-example '
    semanticswitchExample = 'fd-semantic-switch-example '
    switchFormsExample = 'fd-switch-forms-example '
    playGroundSwitchExample = '.col.playground-content '
    
    toggle = '.fd-switch'
    toggleInput = '.fd-switch__input'
    disabledToggle = 'fd-switch is-disabled'
    disabledAndCompactToggle = 'fd-switch fd-switch--compact is-disabled'
    switchSizes = this.switchSizesExample + this.toggle
    disabledSwitch = this.disabledSwitchExample + this.toggle
    bindSwitch = this.switchBindingExample + this.toggle
    semanticSwitch = this.semanticswitchExample + this.toggle
    switchformSwtich = this.switchFormsExample + this.toggle
    playGroundSwitch = buttonPlaygroundTag + this.toggle
    checkboxes = '.fd-checkbox__label'

    declineIcon = this.semanticswitchExample + '.sap-icon--decline'
    acceptIcon = this.semanticswitchExample + '.sap-icon--accept'
    switchBtn = this.switchBindingExample + '.fd-button--standard'
    
    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'switch'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'switch'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
    
}
