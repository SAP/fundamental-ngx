import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FileUploaderPo extends CoreBaseComponentPo {
    url = '/file-uploader';

    fileUploaderExample = 'fd-file-uploader-example ';
    fileUploaderCompactExample = 'fd-file-uploader-compact-example ';

    fileUploaderInput = '.fd-file-uploader__input';
    browseButton = 'fd-file-uploader button:not([disabled])';
    browseButtonDisabled = 'fd-file-uploader button[disabled]';
    fileUploaderInputFile = 'fd-file-uploader input[type="file"]';
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
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'file-uploader'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
