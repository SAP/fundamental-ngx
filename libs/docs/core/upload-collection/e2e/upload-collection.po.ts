import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class UploadCollectionPo extends CoreBaseComponentPo {
    url = '/upload-collection';

    uploadCollectionExample = 'fd-upload-collection-example ';
    uploadCollectionSmallExample = 'fd-upload-collection-small-example ';
    uploadCollectionCustomExample = 'fd-upload-collection-custom-example ';
    uploadCollectionComplexExample = 'fd-upload-collection-complex-example ';

    link = '.fd-link';
    editButton = '[glyph="edit"]';
    declineButton = '[glyph="decline"]';
    input = '.fd-input.ng-star-inserted';
    okButton = 'button[style="display: inline-flex;"]';
    item = '.fd-list__item';
    emphasizedButton = '.fd-button--emphasized';
    fileUploaderInputFile = 'input.fd-file-uploader__hidden';
    checkbox = 'fd-checkbox';
    standardButton = '.fd-button--standard';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'upload-collection'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'upload-collection'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
