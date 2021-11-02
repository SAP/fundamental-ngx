import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class WizardPo extends CoreBaseComponentPo {
    private url = '/wizard';

    defaultExample = 'fd-wizard-example ';
    customizableExample = 'fd-wizard-customizable-example ';
    mobileExample = 'fd-wizard-mobile-example ';
    branchingExample = 'fd-wizard-branching-example ';
    dialogExample = 'fd-wizard-dialog-example ';
    ngforExample = 'fd-wizard-ngfor-example ';
    dialogWizard = '.fd-dialog--active ';

    button = '.fd-button';

    wizard = '.docs-wizard-example-overlay ';
    step = '.fd-wizard__step';
    exitButton = '.docs-wizard-example-button ' + this.button;
    nextStep = '.fd-wizard__next-step ' + this.button;
    buttonsBar = '.fd-bar__element';
    stepContainer = '.fd-wizard__step-container';

    fullNameInput = '#input-1';
    firstAdressInput = '#input-2';
    secAdressInput = '#input-3';

    customerInformationSection = this.wizard + '.fd-container:nth-child(4) ';
    column = '.fd-col';
    savedName = this.customerInformationSection + this.column + ':nth-child(2) ' + 'label:nth-child(1)';
    savedFirstAdress = this.customerInformationSection + this.column + ':nth-child(2) ' + 'label:nth-child(3)';
    savedSecAdress = this.customerInformationSection + this.column + ':nth-child(2) ' + 'label:nth-child(5)';
    editButton = this.customerInformationSection + this.column + ':nth-child(3) ' + 'a';

    contentSection = this.wizard + '.fd-wizard__content ';
    radioButton = this.contentSection + '.fd-radio';

    containerFooter = 'fd-dialog-footer ';
    dialogContainer = 'fd-dialog-container ';

    continueButton = this.containerFooter + '.fd-button--emphasized';
    cancelButton = this.containerFooter + '.fd-button--transparent';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'wizard'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'wizard'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
