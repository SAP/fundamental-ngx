import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectNumberPo extends CoreBaseComponentPo {
    private url = '/object-number';
    root = '#page-content';
    pageHeader = 'fd-object-number-header h1';

    objectNumbers = 'fd-object-number';
    objText = '.fd-object-number__text';
    objUnit = '.fd-object-number__unit';

    allExamples = 'component-example ' + this.objectNumbers;
    basicExamples = 'fd-object-number-basic-example ' + this.objectNumbers;
    objStatusExamples = 'fd-object-number-status-example ' + this.objectNumbers;
    largeObjExamples = 'fd-object-number-large-example ' + this.objectNumbers;
    boldObjExamples = 'fd-object-number-bold-example ' + this.objectNumbers;
    boldObjExampleText = 'fd-object-number-bold-example ' + this.objText;
    unitObjExamples = 'fd-object-number-units-example ' + this.objectNumbers;
    decimalObjExamples = 'fd-object-number-decimal-example ' + this.objectNumbers;
    truncationObjExample = 'fd-object-number-truncation-example' + this.objectNumbers;

    objectNumberText = async (exampleBlock: string): Promise<string> => exampleBlock + ' ' + this.objText;

    objectNumberUnit = async (exampleBlock: string): Promise<string> => exampleBlock + ' ' + this.objUnit;

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-number'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-number'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
