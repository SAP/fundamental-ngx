import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent, getElementArrayLength } from '../../driver/wdio';

export class SplitButtonPo extends CoreBaseComponentPo {
    private url = '/splitButton';

    root = '#page-content';

    buttonBehaviorExample = 'fd-split-button-behaviors-example ';
    iconBehaviorExample = 'fd-split-button-icons-example';
    buttonTypesExample = 'fd-split-button-types-example';
    buttonPragmaticalExample = 'fd-split-button-programmatical-example';
    buttonTemplateExample = 'fd-split-button-template-example';

    mainbtn = '.fd-button__text.fd-button-split__text.ng-star-inserted';
    arrowDownBtn = '.sap-icon--slim-arrow-down.ng-star-inserted';
    icons = 'fd-icon';
    cartIcon = '.sap-icon--cart.ng-star-inserted';
    menuIcon = '.sap-icon--menu.ng-star-inserted';
    button = '.fd-button';
    openButton = '.fd-button__text.ng-star-inserted = Open';
    closeButton = '.fd-button__text.ng-star-inserted = Close';
    Select1Btn = '.fd-button__text.ng-star-inserted = Select Option 1';
    Select2Btn = '.fd-button__text.ng-star-inserted = Select Option 2';
    splitMenu = '.fd-popover__popper.fd-popover__popper--cdk-custom.fd-popover__popper--no-arrow';
    splitItem = '.fd-menu__list li';


    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'slider'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'slider'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
