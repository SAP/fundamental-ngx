import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FileUploaderPo extends PlatformBaseComponentPo {
    private url = '/file-uploader';
    root = '#page-content';

    fileUploaderRoot = 'fd-file-uploader';
    fileUploaderInput = this.fileUploaderRoot + ' input[type="text"]';
    fileUploaderInputFile = this.fileUploaderRoot + ' input[type="file"]';
    browseButton = this.fileUploaderRoot + ' button';
    fileSelectedText = '[class="fd-doc-component"] span[class="green"]';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'file-uploader'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'file-uploader'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
