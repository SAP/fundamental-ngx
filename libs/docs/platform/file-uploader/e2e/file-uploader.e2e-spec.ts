import {
    click,
    getAlertText,
    getElementArrayLength,
    getElementPlaceholder,
    getElementTitle,
    getText,
    refreshPage,
    uploadFile,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { FileUploaderPo } from './file-uploader.po';
import { imagePath, placeholderValue, titleValue } from './file-uploader.page-content';

describe('File uploader test suite', () => {
    const fileUploaderPage: FileUploaderPo = new FileUploaderPo();
    const { fileUploaderInput, fileUploaderInputFile, browseButton, fileSelectedText } = fileUploaderPage;

    beforeAll(() => {
        fileUploaderPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(fileUploaderPage.root);
        waitForElDisplayed(fileUploaderPage.title);
    }, 1);

    it('Verify placeholders', () => {
        const arrLength = getElementArrayLength(fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            expect(placeholderValue).toContain(getElementPlaceholder(fileUploaderInput, i));
        }
    });

    it('Verify browser button', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            click(browseButton, i);
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file upload', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderInputFile, imagePath);
            expect(imagePath).toContain(getText(fileSelectedText, i));
            expect(imagePath).toContain(getElementTitle(fileUploaderInput, i).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file uploaded message', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderInputFile, imagePath, i);
            expect(titleValue).toContain(getAlertText());
        }
    });

    it('should check LTR and RTL orientation', () => {
        fileUploaderPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            fileUploaderPage.saveExampleBaselineScreenshot();
            expect(fileUploaderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
