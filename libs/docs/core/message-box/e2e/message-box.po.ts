import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MessageBoxPo extends CoreBaseComponentPo {
    private url = '/message-box';
    root = '#page-content';

    basedObjectExample = 'fd-object-based-message-box-example ';
    openTemplateExample = 'fd-template-based-message-box-example ';
    basedComponentExample = 'fd-component-based-message-box-example ';
    sematicTypesExample = 'fd-semantic-types-example ';
    positionExample = 'fd-message-box-position-example ';
    mobileExample = 'fd-message-box-mobile-example ';
    complexTemplateExample = 'fd-complex-template-example ';
    messageBoxExample = 'fd-message-box-container ';

    messageBox = 'fd-message-box';
    button = '.fd-button';
    okButton = 'fd-button-bar:nth-child(1)';
    cancelButton = 'fd-button-bar:nth-child(2)';
    resultTxt = 'p';
    messageIcon = this.messageBoxExample + 'fd-message-box-semantic-icon > i';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'message-box'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'message-box'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
