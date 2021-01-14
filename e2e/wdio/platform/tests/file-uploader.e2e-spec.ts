import {
    browserIsIEorSafari,
    click,
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getText,
    refreshPage, sendKeys,
    uploadFile, waitForPresent
} from '../../driver/wdio';
import { FileUploaderPo } from '../pages/file-uploader.po';
import { imagePath, placeholderValue, titleValue } from '../fixtures/appData/file-uploader.page-content';

describe('File uploader test suite', function() {
    const fileUploaderPO: FileUploaderPo = new FileUploaderPo();

    beforeAll(() => {
        fileUploaderPO.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(fileUploaderPO.fileUploaderRoot);
    }, 1);

    it('Verify placeholders', () => {
        const arrLength = getElementArrayLength(fileUploaderPO.fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            expect(placeholderValue).toContain(getAttributeByName
            (fileUploaderPO.fileUploaderInput, 'placeholder', i));
        }
    });

    it('Verify browser button', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        const arrLength = getElementArrayLength(fileUploaderPO.browseButton);
        for (let i = 0; i < arrLength; i++) {
            click(fileUploaderPO.browseButton, i);
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file upload', () => {
        const arrLength = getElementArrayLength(fileUploaderPO.browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderPO.fileUploaderInputFile, imagePath);
            expect(imagePath).toContain(getText(fileUploaderPO.fileSelectedText, i));
            expect(imagePath).toContain(getAttributeByName(fileUploaderPO.fileUploaderInput, 'title', i).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file uploaded message', () => {
        const arrLength = getElementArrayLength(fileUploaderPO.browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderPO.fileUploaderInputFile, imagePath, i);
            expect(titleValue).toContain(getAlertText());
        }
    });

    it('should check LTR and RTL orientation', () => {
        fileUploaderPO.checkRtlSwitch();
    });

});
