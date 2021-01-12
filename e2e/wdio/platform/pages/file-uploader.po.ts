import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class FileUploaderPo extends BaseComponentPo {
    private url = '/file-uploader';
    root = '#page-content';

    fileUploaderRoot = 'fd-file-uploader';
    fileUploaderInput = this.fileUploaderRoot + ' input[type="text"]';
    fileUploaderInputFile = this.fileUploaderRoot + ' input[type="file"]'
    browseButton = this.fileUploaderRoot + ' button';
    fileSelectedText = '[class="fd-doc-component"] span[class="green"]'

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
