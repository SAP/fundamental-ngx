import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class WizardPo extends CoreBaseComponentPo {
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

    customerInformationSection = this.wizard + '.fd-container:nth-of-type(2) ';
    savedName = this.customerInformationSection + 'div:nth-of-type(1) div:nth-of-type(2) label';
    savedFirstAdress = this.customerInformationSection + 'div:nth-of-type(2) div:nth-of-type(2) label';
    savedSecAdress = this.customerInformationSection + 'div:nth-of-type(3) div:nth-of-type(2) label';
    editButton = this.customerInformationSection + 'div:nth-of-type(3) div:nth-of-type(3) a';

    contentSection = this.wizard + '.fd-wizard__content ';
    radioButton = this.contentSection + '.fd-radio';
    radioButtonLabel = this.contentSection + '.fd-radio__label';

    containerFooter = 'fd-dialog-footer ';
    dialogContainer = 'fd-dialog-container ';

    continueButton = this.containerFooter + '.fd-button--emphasized';
    cancelButton = this.containerFooter + '.fd-button--transparent';

    private url = '/wizard';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'wizard'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'wizard'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
