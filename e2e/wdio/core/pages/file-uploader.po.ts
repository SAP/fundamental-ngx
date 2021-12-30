import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FileUploaderPo extends CoreBaseComponentPo {
    url = '/file-uploader';

    fileUploaderExample = 'fd-file-uploader-example ';
    fileUploaderCompactExample = 'fd-file-uploader-compact-example ';

    fileUploaderInput = '.fd-file-uploader__input';
    browseButton = 'fd-file-uploader button';
    fileUploaderInputFile = 'fd-file-uploader input[type="file"]';
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
