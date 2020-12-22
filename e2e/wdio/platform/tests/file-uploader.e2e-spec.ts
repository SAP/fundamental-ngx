import { webDriver } from '../../driver/wdio';
import { FileUploaderPo } from '../pages/file-uploader.po';
import { placeholderValue, titleValue, imagePath } from '../fixtures/appData/file-uploader.page-content';

describe('File uploader test suite', function() {
    const fileUploaderPO: FileUploaderPo = new FileUploaderPo();

    beforeAll(() => {
        fileUploaderPO.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify placeholders', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploaderPO.fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            expect(placeholderValue).toContain(webDriver.getAttributeByName
            (fileUploaderPO.fileUploaderInput, 'placeholder', i));
        }
    });

    it('Verify browser button', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploaderPO.browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.click(fileUploaderPO.browseButton, i);
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file upload', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploaderPO.browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.uploadFile(fileUploaderPO.fileUploaderInputFile, imagePath);
            expect(imagePath).toContain(webDriver.getText(fileUploaderPO.fileSelectedText, i));
            expect(imagePath).toContain(webDriver.getAttributeByName(fileUploaderPO.fileUploaderInput, 'title', i).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file uploaded message', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploaderPO.browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.uploadFile(fileUploaderPO.fileUploaderInputFile, imagePath, i);
            expect(titleValue).toContain(webDriver.getAlertText());
        }
    });

    it('should check LTR and RTL orientation', () => {
        fileUploaderPO.checkRtlSwitch();
    });

});
