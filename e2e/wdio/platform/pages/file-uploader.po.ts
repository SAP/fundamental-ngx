import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FileUploaderPo extends BaseComponentPo {
    private url = '/file-uploader';
    root = '#page-content';

    fileUploaderRoot = 'fd-file-uploader';
    fileUploaderInput = this.fileUploaderRoot + ' input[type="text"]';
    fileUploaderInputFile = this.fileUploaderRoot + ' input[type="file"]';
    browseButton = this.fileUploaderRoot + ' button';
    fileSelectedText = '[class="fd-doc-component"] span[class="green"]';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'file-uploader'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'file-uploader'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
