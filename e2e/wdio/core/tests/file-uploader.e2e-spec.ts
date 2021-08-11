import { FileUploaderPo } from '../pages/file-uploader.po';
import {
    getAlertText,
    getAttributeByName,
    getElementArrayLength, getText, isElementClickable,
    refreshPage,
    scrollIntoView, uploadFile
} from '../../driver/wdio';

import { placeholderTestTextArr, imagePath, titleValue } from '../fixtures/appData/file-uploader-contents';

describe('File uploader component test', function() {
    const fileUploaderPage = new FileUploaderPo();
    const { fileUploaderInput, browseButton, fileUploaderInputFile, fileSelectedText } = fileUploaderPage;

    beforeAll(() => {
        fileUploaderPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    it('verify placeholders', () => {
        const arrLength = getElementArrayLength(fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            scrollIntoView(fileUploaderInput, i);
            expect(getAttributeByName(fileUploaderInput, 'placeholder', i)).toBe(placeholderTestTextArr[i]);
        }
    });

    it('verify browser button', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            scrollIntoView(browseButton, i);
            expect(isElementClickable(browseButton, i)).toBe(true, `browse button with index ${i} not clickable`);
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('verify file upload', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderInputFile, imagePath, i);
            expect(imagePath).toContain(getText(fileSelectedText, i));
            expect(imagePath).toContain(getAttributeByName(fileUploaderInput, 'title', i).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('verify file uploaded message', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderInputFile, imagePath, i);
            expect(titleValue).toContain(getAlertText());
        }
    });


    it('should check RTL and LTR orientation', () => {
        fileUploaderPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', function() {

        it('should check visual regression for all examples', () => {
            fileUploaderPage.saveExampleBaselineScreenshot();
            expect(fileUploaderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
