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

    objectNumberText = (exampleBlock: string): string => exampleBlock + ' ' + this.objText;

    objectNumberUnit = (exampleBlock: string): string => exampleBlock + ' ' + this.objUnit;

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'object-number'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'object-number'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
